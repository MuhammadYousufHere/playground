import { CssBaseline } from '@mui/material'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { ReactNode } from 'react'
import { responsiveTheme } from './theme'
import { useSetting } from '@/features/Setting/useSetting'

export default function ThemeCustomization({ children }: { children: ReactNode }) {
  const { mode, direction } = useSetting()
  const theme = { ...responsiveTheme({ mode }), direction }
  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  )
}
