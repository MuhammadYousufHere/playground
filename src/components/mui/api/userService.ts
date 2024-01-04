import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Tags, type LogoutResp, ProfileResponse } from './types'
import { fetchBaseQueryWithReauth, prepareAuthHeader } from './utils'
import { servicesEndpoints } from '@/config/apiConstants'
import { receiveSuccessfullAuthentication } from '@/features/Session/sessionSlice'
import { LoginRequest, PAAuthResponse } from '@/features/Session/types'
import { clearToastMessage, setToastMessage } from '@/features/Toast/toastSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: servicesEndpoints.userService,
  prepareHeaders: prepareAuthHeader
})
export const userService = createApi({
  reducerPath: 'userApi',
  keepUnusedDataFor: 60 * 60,
  baseQuery: fetchBaseQueryWithReauth(baseQuery),
  tagTypes: [Tags.OrgList, Tags.OrgMembers, Tags.Organization, Tags.Organizations],
  endpoints: builder => ({
    login: builder.mutation<PAAuthResponse, LoginRequest>({
      query: () => ({
        url: 'user/auth',
        method: 'POST'
      }),

      async onQueryStarted(_body, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(receiveSuccessfullAuthentication(data))
          // eslint-disable-next-line
        } catch (resp: any) {
          const errorMessage =
            ('error' in resp && resp.error?.status === 403) || resp.error?.status === 404
              ? 'Invalid username or password'
              : 'An error occurred while logging in'
          dispatch(
            setToastMessage({
              message: errorMessage,
              severity: 'error'
            })
          )
        }
      }
    }),
    profile: builder.query<ProfileResponse, void>({
      query: () => ({ url: 'user' })
    }),
    logout: builder.query<LogoutResp, undefined>({
      query: () => ({ url: 'user/logout' }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (e) {
          dispatch(
            setToastMessage({
              message: 'An error occured while doing logout',
              severity: 'error'
            })
          )
          setTimeout(() => {
            dispatch(clearToastMessage())
          }, 2500)
        }
      }
    })
  })
})

export const { useLoginMutation, useLogoutQuery, useProfileQuery } = userService
