import { useEffect } from 'react'
import Cookies from 'js-cookie'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import history from '@/common/history'
import { KEYS } from '@/config'
import { selectToken } from '@/features/Auth/selectors'
import { selectLogged } from '@/features/Session/selectors'
import { useAppDispatch, useAppSelector } from '@/features/store'
import { resetState } from '@/features/Auth/authSlice'
import { resetSession } from '@/features/Session/sessionSlice'
import { PATHS } from '@/routes/paths'

export const useAuthenticatedRedirect = () => {
  const isLoggedIn = useAppSelector(selectLogged)
  const accessToken = useAppSelector(selectToken)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (isLoggedIn && (accessToken || Cookies.get(KEYS.token))) {
      const token = accessToken || Cookies.get(KEYS.token)
      const accessTokenExp = (jwtDecode(token as string) as JwtPayload).exp!
      const currentTime = Date.now() / 1000
      if (accessTokenExp < currentTime) {
        Cookies.remove(KEYS.token)
        dispatch(resetState())
        dispatch(resetSession())
        return undefined
      }
      history.replace(PATHS.general.organizations.root)
    }
    return undefined
  }, [isLoggedIn, accessToken, dispatch])
}
