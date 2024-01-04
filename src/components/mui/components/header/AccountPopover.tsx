import { useState, useRef } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Box, Divider, Stack, MenuItem } from '@mui/material'
import { IconButtonAnimate } from '../animate'
import MenuPopover from '../MenuPopover'
import { Avatar } from '../Avatar'
import { Typography } from '..'
import useIsMountedRef from '@/hooks/useIsMountedRef'
import { PATHS } from '@/routes/paths'
import { useAppDispatch } from '@/features/store'
import { logoutUser } from '@/features/Auth/authSlice'
import { useProfileQuery } from '@/api/userService'
import { createAvatar } from '@/utils'

const MENU_OPTIONS = [
  {
    label: 'Profile',
    linkTo: `${import.meta.env.VITE_APP_APP_PORTAL_ROUTE}/profile`
  },
  {
    label: 'Setting',
    linkTo: `${import.meta.env.VITE_APP_APP_PORTAL_ROUTE}/manage/organization`
  }
]

export default function AccountPopover() {
  const { data: profile } = useProfileQuery()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const ref = useRef<HTMLButtonElement>(null)
  const isMountedRef = useIsMountedRef()
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleLogout = async () => {
    await dispatch(logoutUser())
    navigate(PATHS.auth, { replace: true })

    if (isMountedRef.current) {
      handleClose()
    }
  }
  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        ref={ref}
        size="large"
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: '""',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute'
              // bgcolor: theme => alpha(theme.palette.grey[800], 0.6)
            }
          })
        }}
      >
        <Avatar alt="user" size="medium" color={'default'} src="">
          {createAvatar(profile?.data?.user?.name as string).name}
        </Avatar>
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        onClose={handleClose}
        disabledArrow={false}
        arrow={'top-right'}
        anchorEl={ref.current}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75
          }
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {profile?.data?.user?.name}
          </Typography>
          <Typography title={profile?.data?.user?.username} variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {profile?.data?.user?.username}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map(option => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Log out
        </MenuItem>
      </MenuPopover>
    </>
  )
}
