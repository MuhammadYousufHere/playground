import { CSSProperties, FunctionComponent, ReactNode } from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import { Box, Stack, useTheme } from '@mui/material'

interface ButtonProps {
  readonly onClick?: VoidFunction
  readonly style: CSSProperties
  readonly children: ReactNode
}

interface LinkProps extends ButtonProps {
  readonly to: string
  readonly children: ReactNode
}

interface AnchorProps extends ButtonProps {
  readonly href: string
  readonly children: ReactNode
}

type WrapperProps = LinkProps | ButtonProps | AnchorProps

interface SideBarNavLinkProps {
  readonly label: string
  readonly icon: JSX.Element
  readonly to?: string
  readonly href?: string
  readonly isCollapseHover?: boolean
  readonly onClick?: VoidFunction
  readonly isCollapse?: boolean
}

const Wrapper: FunctionComponent<WrapperProps> = ({ children, ...props }) => {
  if ('to' in props && props.to) {
    return <Link {...props}>{children}</Link>
  } else if ('href' in props && props.href) {
    return (
      <a target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    )
  } else {
    return <Box {...props}>{children}</Box>
  }
}

export const SideBarNavLink: FunctionComponent<SideBarNavLinkProps> = ({
  isCollapse,
  isCollapseHover,
  label,
  icon,
  to,
  href,
  onClick
}) => {
  const resolved = useResolvedPath(to || '')
  const match = useMatch({ path: resolved.pathname, end: false })
  const isActiveLink = to && match
  const theme = useTheme()
  const show = !isCollapse || isCollapseHover
  return (
    <Wrapper
      onClick={onClick}
      to={to}
      href={href}
      style={{
        textDecoration: 'none',
        minWidth: '100%',
        cursor: 'pointer',
        position: 'relative',
        marginLeft: '10px'
      }}
    >
      <Stack
        direction="row"
        sx={{
          fontSize: '12px',
          lineHeight: '17px',
          fontWeight: 600,
          fontFamily: theme.typography.button.fontFamily,
          textTransform: 'uppercase',
          alignItems: 'center',
          borderRadius: '5px',
          padding: '10px 20px',
          color: isActiveLink ? theme.colors.baseBlue : theme.colors.para,
          background: isActiveLink ? theme.colors.activeBackground : 'transparent',
          opacity: isActiveLink ? 1 : 0.8,
          transition: 'background-color 0ms',
          display: 'flex',
          justifyContent: 'flex-start',
          mr: '10px',
          gap: 1.7,
          '&:hover': {
            opacity: '1',
            background: theme.colors.activeBackground
          }
        }}
        data-testid="navStyled"
      >
        {icon}
        {show && <span>{label}</span>}
        {isActiveLink && (
          <Box
            sx={{
              height: '50%',
              width: '5px',
              background: '#3366FF',
              position: 'absolute',
              zIndex: 3,
              left: 0,
              my: 'auto',
              borderRadius: '0 10px 10px 0'
            }}
          />
        )}
      </Stack>
    </Wrapper>
  )
}

export default SideBarNavLink
