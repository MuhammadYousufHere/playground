import { type Dispatch, type SetStateAction } from 'react'
import { Box, Stack, AppBar, Toolbar } from '@mui/material'
import { styled, useTheme, type Theme } from '@mui/material/styles'
import { FaBarsStaggered } from 'react-icons/fa6'
import AccountPopover from './AccountPopover'
import NotificationsPopover from './NotificationsPopover'
import ThemeSwitch from './ThemeSwitch'
import Searchbar from './Searchbar'
import LanguageSwitch from './LanguageSwitch'
import { cssStyles } from '@/styles'
import { HEADER, NAVBAR } from '@/config'
import { IconButtonAnimate } from '@/components/animate'
import useMenu from '@/features/Menu/useMenu'

interface RootStyleProps {
  isCollapse?: boolean
  isOffset?: boolean
  verticalLayout?: boolean
  theme?: Theme
}
export type Header = {
  isCollapse: boolean
  isDesktop: boolean
  onOpenSidebar: Dispatch<SetStateAction<boolean>>
}

const RootStyle = styled(AppBar, {
  shouldForwardProp: prop => prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout'
})<RootStyleProps>(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur({ opacity: 0.8 }),
  boxShadow: '0 1px 2px 0 rgba(0,0,0,0.1)',
  // position: 'static',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,

  [theme.breakpoints.up('lg')]: {
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shorter
    }),
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default
    })
  }
}))

export default function Header({ isCollapse, isDesktop }: Header) {
  const theme = useTheme()
  // const isLarge = useMediaQuery(theme.breakpoints.up('lg'))
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { onToggleDrawer, toggleCollapse } = useMenu()
  return (
    <RootStyle isCollapse={isCollapse}>
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: { lg: 3 }
        }}
      >
        <IconButtonAnimate
          size="medium"
          sx={{ mr: 0.6, ml: -0.5, transform: 'rotate(180deg)' }}
          onClick={() => (isDesktop ? toggleCollapse() : onToggleDrawer())}
        >
          <FaBarsStaggered style={{ color: theme.colors.baseBlue, width: 20, height: 20 }} />
        </IconButtonAnimate>
        <Searchbar />

        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <LanguageSwitch />
          <ThemeSwitch />
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </Toolbar>
    </RootStyle>
  )
}
