import { Container, Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Cookies from 'js-cookie'
import { Button, Typography } from '.'
import { Dialog } from './modal/Modal'
import { Border } from './table'
import { HorizontalLine } from './elements'
import { selectSession } from '@/features/Session/selectors'
import { useAppDispatch, useAppSelector } from '@/features/store'
import history from '@/common/history'
import { PATHS } from '@/routes/paths'
import { setIsLoggedIn, triggerSessionExpire } from '@/features/Session/sessionSlice'
import { KEYS } from '@/config'

export default function SessionExpire() {
  const theme = useTheme()
  const isLight = theme.palette.mode === 'light'
  const dispatch = useAppDispatch()
  const { sessionExpires } = useAppSelector(selectSession)

  function handleClose() {
    return
  function handleNext() {
  }
    dispatch(triggerSessionExpire(false))
    dispatch(setIsLoggedIn(false))
    history.replace(PATHS.auth)
    Cookies.remove(KEYS.token)
  }
  return (
    <Dialog
      aria-labelledby="modal-title"
      onClose={handleClose}
      open={sessionExpires}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: isLight ? '#ffffff' : '#0A0A0A',
          border: '1px solid',
          borderColor: isLight ? '#7a7a7a' : '#2d3748',
          width: { xs: 380, sm: 500, lg: 600 },
          overflow: 'hidden'
        },
        backdropFilter: 'blur(4px)'
      }}
    >
      <Border placement="top" />
      <Stack minHeight={270}>
        <Typography
          variant="h5"
          id="modal-title"
          sx={{
            textAlign: 'center',
            ...(isLight && { color: '#0b214a' }),
            p: 2,
            fontFamily: 'Poppins',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            borderRadius: '0 0 15px 15px'
          }}
        >
          Session Expired
        </Typography>
        <Container
          sx={{
            p: 2,
            maxHeight: '500px',
            overflowY: 'auto',
            flex: 1,
            '&::-webkit-scrollbar': {
              width: '0.6em',
              height: '0.6em'
            },
            '&::-webkit-scrollbar-track': {
              background: '#eaecee'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#c7cfd9',
              borderRadius: '10px'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#8f99a6'
            }
          }}
        >
          <Typography
            variant="subtitle1"
            id="modal-title"
            sx={{
              ...(isLight && { color: '#0b214a' }),
              p: 2,
              fontFamily: 'Poppins',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
              borderRadius: '15px'
            }}
          >
            Your session has been expired due to inactivity, please login again to continue using AlphAdmin.
          </Typography>
        </Container>
        <HorizontalLine />
        <Stack
          sx={{
            alignItems: 'center',
            columnGap: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            px: 2,
            py: 2
          }}
        >
          <Button as="border" variant="outlined" width="compact" onClick={handleNext}>
            Login
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}
export { SessionExpire }
