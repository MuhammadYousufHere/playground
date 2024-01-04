import { forwardRef, PropsWithChildren, ComponentPropsWithoutRef } from 'react'
import { useTheme } from '@mui/material/styles'
import { Avatar as MUIAvatar, AvatarProps } from '@mui/material'

interface IProps extends ComponentPropsWithoutRef<'div'> {
  color?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'
  size: 'small' | 'medium' | 'large'
}

export const Avatar = forwardRef<HTMLDivElement, PropsWithChildren<IProps & AvatarProps>>(
  ({ color = 'success', children, ...other }, ref) => {
    const theme = useTheme()

    if (color === 'default') {
      return (
        <MUIAvatar ref={ref} {...other}>
          {children}
        </MUIAvatar>
      )
    }

    return (
      <MUIAvatar
        ref={ref}
        sx={{
          fontWeight: theme.typography.fontWeightMedium,
          color: theme.palette[color].contrastText,
          backgroundColor: theme.palette[color].main,
          fontFamily: 'Poppins'
        }}
        {...other}
      >
        {children}
      </MUIAvatar>
    )
  }
)

Avatar.displayName = 'Avatar'
