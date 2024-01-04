import { Link as RouterLink } from 'react-router-dom'
import { alpha, styled, useTheme } from '@mui/material/styles'
import { Box, Link, LinkProps } from '@mui/material'

import { Typography } from '.'
import { Avatar } from './Avatar'
import { useProfileQuery } from '@/api/userService'
import useMenu from '@/features/Menu/useMenu'

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5, 2.5),
  marginBlock: '1rem',
  borderRadius: Number(theme.shape.borderRadius) * 1,
  backgroundColor: alpha('#919EAB', 0.15),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter
  })
}))

interface INavbarAccount extends LinkProps {
  isCollapse: boolean
}

export default function NavbarAccount({ isCollapse, ...rest }: INavbarAccount) {
  const theme = useTheme()
  const { data } = useProfileQuery()
  const { collapseHover } = useMenu()
  return (
    <Link underline="none" color="inherit" component={RouterLink} to={'/'} {...rest}>
      <RootStyle
        sx={{
          border: '1px solid transparent',
          ...(!isCollapse && {
            borderColor: theme.palette.mode === 'light' ? '#d1cfc8' : '#2d3748'
          }),
          ...(collapseHover && {
            borderColor: theme.palette.mode === 'light' ? '#d1cfc8' : '#2d3748'
          }),
          bgcolor: !isCollapse ? alpha('#919EAB', 0.15) : collapseHover ? alpha('#919EAB', 0.15) : 'transparent',
          ml: !isCollapse ? 1 : collapseHover ? 1 : 0.3
        }}
      >
        <Avatar alt="me" src="" size="medium" about="" color="default" />

        <Box
          sx={{
            ml: 2,
            transition: theme =>
              theme.transitions.create('opacity', {
                duration: theme.transitions.duration.shorter
              }),

            opacity: !isCollapse ? 1 : collapseHover ? 1 : 0
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {data?.data.user.name}
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {data?.data.user.role}
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  )
}
