import { ReactNode, useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Typography } from '@/components'
import Signin from '@/pages/authentication/Signin'
import { useAppDispatch, useAppSelector } from '@/features/store'
import { selectLogged } from '@/features/Session/selectors'
import { receiveSuccessfullAuthentication } from '@/features/Session/sessionSlice'
import { receiveRefreshTokenForAuth } from '@/features/Auth/authSlice'

interface IAuthGuard {
  children: ReactNode
}

export default function AuthGuard({ children }: IAuthGuard) {
  const [params, setSearchParams] = useSearchParams()
  const token = params.get('pToken')
  const isAuthenticated = useAppSelector(selectLogged)
  const isInitialized = true
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const [requestedLocation, setRequestedLocation] = useState<null | string>(null)
  useEffect(() => {
    if (token) {
      setSearchParams('')
      dispatch(
        receiveSuccessfullAuthentication({
          data: { accessToken: token },
          message: 'Succssfuly authenticated',
          status_code: 200
        })
      )
      dispatch(
        receiveRefreshTokenForAuth({
          accessToken: token
        })
      )
    }
  }, [dispatch, setSearchParams, token])
  if (!isInitialized) {
    return <Typography>Loading...</Typography>
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname)
    }
    return <Signin />
  }

  return <>{children}</>
}
