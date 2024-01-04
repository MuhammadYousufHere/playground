import { type PropsWithChildren } from 'react'
import { alpha, styled } from '@mui/material/styles'

interface IProps {
  color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'
  variant: 'filled' | 'outlined' | 'ghost'
}
type RootType = {
  ownerState: IProps
}
const RootStyle = styled('span')<RootType>(({ theme, ownerState }) => {
  const isLight = theme.palette.mode === 'light'
  const { color, variant } = ownerState

  const styleFilled = (color: IProps['color']) => ({
    color: theme.palette[color].contrastText,
    backgroundColor: theme.palette[color].main
  })

  const styleOutlined = (color: IProps['color']) => ({
    color: theme.palette[color].main,
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette[color].main}`
  })

  const styleGhost = (color: IProps['color']) => ({
    color: theme.palette[color][isLight ? 'dark' : 'light'],
    backgroundColor: alpha(theme.palette[color].main, 0.16)
  })

  return {
    height: 22,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 8,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    color: theme.palette.grey[800],
    fontSize: theme.typography.pxToRem(9),
    fontFamily: theme.typography.fontFamily || 'Poppins',
    backgroundColor: theme.palette.grey[300],
    fontWeight: theme.typography.fontWeightBold,

    ...(color !== 'primary'
      ? {
          ...(variant === 'filled' && { ...styleFilled(color) }),
          ...(variant === 'outlined' && { ...styleOutlined(color) }),
          ...(variant === 'ghost' && { ...styleGhost(color) })
        }
      : {
          ...(variant === 'outlined' && {
            backgroundColor: 'transparent',
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.grey['A200']}`
          }),
          ...(variant === 'ghost' && {
            color: isLight ? theme.palette.text.secondary : theme.palette.common.white,
            backgroundColor: theme.palette.grey['800']
          })
        })
  }
})

// ----------------------------------------------------------------------

export default function Label({ color = 'success', variant = 'ghost', children, ...other }: PropsWithChildren<IProps>) {
  return (
    <RootStyle ownerState={{ color, variant }} {...other}>
      {children}
    </RootStyle>
  )
}
