import { type BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import Cookies from 'js-cookie'
import { Mutex } from 'async-mutex'
import axios from 'axios'
import { ResfreshResponse } from './types'
import { RootState } from '@/features/store'
import { KEYS, servicesEndpoints } from '@/config'
import { receiveRefreshToken, triggerSessionExpire } from '@/features/Session/sessionSlice'
import { logoutUser } from '@/features/Auth/authSlice'

const mutex = new Mutex()

/**
 * Wraps a base query with functionality to refresh the access token if it is
 * no longer valid and retry the request. Can be passed an optional alternate
 * baseQuery for the refresh token API call. Utilizes Mutex to prevent
 * additional API calls while refreshing the token.
 */

export const fetchBaseQueryWithReauth = (
  baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  return async (args, api, extraOptions) => {
    const makeRequestWithRefreshedAccessToken = async () => {
      const accessToken = Cookies.get(KEYS.token)

      const argsWithHeader =
        typeof args === 'string'
          ? {
              url: args,
              headers: { Authorization: `Bearer ${accessToken}` }
            }
          : {
              ...args,
              headers: { Authorization: `Bearer ${accessToken}` }
            }

      return await baseQuery(argsWithHeader, api, extraOptions)
    }
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock()

    // get current refresh token

    // attempt request
    let result = await baseQuery(args, api, extraOptions)
    const status = result.error?.status
    if (status === 401 || !Cookies.get(KEYS.token)) {
      // check whether the mutex is unlocked before attempting refresh
      if (!mutex.isLocked()) {
        const release = await mutex.acquire()

        try {
          // get new access and refresh token
          const refreshResult = await axios.get<ResfreshResponse>(
            `${servicesEndpoints.userService}user/token/exchange?applicationId=${
              import.meta.env.VITE_APP_APPLICATION_ID
            }`,
            {
              withCredentials: true,
              ...api,
              ...extraOptions
            }
          )
          // eslint-disable-next-line no-console
          if (refreshResult.data) {
            const authResponse = refreshResult.data
            api.dispatch(receiveRefreshToken(authResponse))

            result = await makeRequestWithRefreshedAccessToken()
          }
        } catch (err) {
          api.dispatch(triggerSessionExpire(true))
          api.dispatch(logoutUser())
        } finally {
          release()
        }
      } else {
        await mutex.waitForUnlock()
        result = await makeRequestWithRefreshedAccessToken()
      }
    }

    return result
  }
}
export const prepareAuthHeader = (
  headers: Headers,
  { getState }: Pick<BaseQueryApi, 'type' | 'getState' | 'extra' | 'endpoint' | 'forced'>
) => {
  const state = getState() as RootState
  const { isLoggedIn } = state.session
  const accessToken = Cookies.get(KEYS.token)
  const hasAuthHeader = !!headers.get('Authorization')

  if (isLoggedIn && accessToken && !hasAuthHeader) {
    headers.set('Authorization', `Bearer ${accessToken}`)
  }

  return headers
}
