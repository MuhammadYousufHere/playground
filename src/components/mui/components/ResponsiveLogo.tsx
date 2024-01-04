import { FunctionComponent } from 'react'
import { useTheme, useMediaQuery } from '@mui/material'
import PALogo from '@/assets/PALogo'

const ResponsiveNEWMLogo: FunctionComponent = () => {
  const theme = useTheme()
  const isBelowMediumBreakpoint = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <PALogo height={isBelowMediumBreakpoint ? '85' : undefined} width={isBelowMediumBreakpoint ? '85' : undefined} />
  )
}

export default ResponsiveNEWMLogo
