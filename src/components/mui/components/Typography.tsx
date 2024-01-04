import { type TypographyProps as MuiTypogaphyProps, Typography as MuiTypography } from '@mui/material'
import { type Theme, useTheme } from '@mui/material/styles'
import { FunctionComponent } from 'react'

export interface TypographyProps extends MuiTypogaphyProps {
  color?: keyof Theme['colors']
}

/**
 * Typography component that allows for easily
 * overriding the color styling.
 */
export const Typography: FunctionComponent<TypographyProps> = ({ color, children, ...rest }) => {
  const theme = useTheme()

  return (
    <MuiTypography color={color ? theme.colors[color] : theme.palette.text.primary} {...rest} fontFamily="Poppins">
      {children}
    </MuiTypography>
  )
}
