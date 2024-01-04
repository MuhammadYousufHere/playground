import { createTheme } from '@mui/material/styles'
import { breakpoints } from './breakpoints'
import { colorsDark, colorsLight, type ChartColors } from './colors'
import { themeTypography } from './typography'
import { customShadows } from './shadows'
import { defaultThemeLight, palette } from './pallete'
import { type PaletteMode } from '@/features/Setting/types'

declare module '@mui/material/styles' {
  interface Theme {
    colors: {
      activeBackground: string
      baseBlue: string
      baseGreen: string
      baseOrange: string
      basePink: string
      basePurple: string
      baseYellow: string
      black: string
      blue: string
      green: string
      grey100: string
      grey200: string
      grey300: string
      grey400: string
      grey500: string
      grey600: string
      grey700: string
      lightBlue: string
      heading1: string
      heading2: string
      heading3: string
      text: string
      para: string
      red: string
      card1: string
      card2: string
      card3: string
      card4: string
      cardBorder: string
      white: string
      yellow: string
      chartColors: ChartColors
    }
    gradients: {
      crypto: string
      magazine: string
      partners: string
      music: string
      btn: string
    }
    inputField: {
      borderWidth: string
      fontFamily: string
      fontSize: string
      fontStyle: string
      fontWeight: number
      lineHeight: string
      minWidth: string
      maxWidth: string
      padding: string
    }
    button: {
      fontSize: string
      lineHeight: string
      fontWeight: number
    }
    customShadows: {
      z1: string
      z8: string
      z12: string
      z16: string
      z20: string
      z24: string
      primary: string
      info: string
      secondary: string
      success: string
      warning: string
      error: string
      card: string
      dialog: string
      dropdown: string
    }
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    colors?: {
      activeBackground?: string
      baseBlue?: string
      baseGreen?: string
      baseOrange?: string
      basePink?: string
      basePurple?: string
      baseYellow?: string
      black?: string
      blue?: string
      green?: string
      grey100?: string
      grey200?: string
      grey300?: string
      grey400?: string
      grey500?: string
      grey600?: string
      grey700?: string
      lightBlue?: string
      heading1?: string
      heading2?: string
      heading3?: string
      text?: string
      para?: string
      card1?: string
      card2?: string
      card3?: string
      card4?: string
      cardBorder?: string
      red?: string
      white?: string
      yellow?: string
      chartColors?: ChartColors
    }
    gradients?: {
      company?: string
      btn?: string
      crypto?: string
      magazine?: string
      partners?: string
      music?: string
    }
    inputField?: {
      fontFamily?: string
      fontStyle?: string
      fontSize?: string
      fontWeight?: number
      lineHeight?: string
      borderWidth?: string
      minWidth?: string
      maxWidth?: string
      padding?: string
    }
    button?: {
      fontSize?: string
      lineHeight?: string
      fontWeight?: number
      fontFaimly: 'Poppins'
    }
    customShadows: {
      z1?: string
      z8?: string
      z12?: string
      z16?: string
      z20?: string
      z24?: string
      primary?: string
      info?: string
      secondary?: string
      success?: string
      warning?: string
      error?: string
      card?: string
      dialog?: string
      dropdown?: string
    }
  }
}
export const theme = createTheme({
  breakpoints,
  shape: { borderRadius: 10 },
  inputField: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    borderWidth: '2px',
    minWidth: '340px',
    maxWidth: '100%',
    padding: '10px 13px'
  },
  gradients: {
    btn: 'linear-gradient(101.63deg,#16489c 8.53%, #28a1c0 107.27%)',
    company: 'linear-gradient(53.48deg, #5091EB 0%, #C341F0 100%);',
    crypto: 'linear-gradient(53.48deg, #41BE91 0%, #5091EB 100%);',
    magazine: 'linear-gradient(53.48deg, #F53C69 0%, #FF6E32 100%);',
    partners: 'linear-gradient(53.48deg, #FF6E32 0%, #FFC33C 100%);',
    music: 'linear-gradient(53.48deg, #C341F0 0%, #F53C69 100%);'
  },
  typography: themeTypography('Poppins'),
  customShadows: {},
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        // enables useMediaQuery() value to update when used in components
        noSsr: true
      }
    },
    // add overides here
    MuiButton: { defaultProps: {}, styleOverrides: { root: { textTransform: 'none' }, startIcon: {} } },
    MuiCheckbox: { styleOverrides: { root: { color: 'red' } } },
    MuiPaper: {
      defaultProps: {
        elevation: 0
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        // body: defaultTheme.palette.mode === 'dark' ? darkScrollbar() : null
      }
    },
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          [defaultThemeLight.breakpoints.down('sm')]: {
            padding: defaultThemeLight.spacing(1),
            '&:last-child': {
              paddingBottom: defaultThemeLight.spacing(1)
            }
          },
          [defaultThemeLight.breakpoints.up('sm')]: {
            '&:last-child': {
              paddingBottom: defaultThemeLight.spacing(2)
            }
          }
        }
      }
    }
  }
})

interface ThemeCheck {
  mode: PaletteMode
}

/**
 * Theme with responsive values using defined breakpoints
 */

export function responsiveTheme({ mode }: ThemeCheck) {
  const isLight = mode === 'light'
  return {
    ...theme,
    colors: isLight ? colorsLight : colorsDark,
    customShadows: isLight ? customShadows.light : customShadows.dark,
    palette: isLight ? palette.light : palette.dark,
    typography: {
      ...theme.typography,
      h1: {
        ...theme.typography.h1,
        [theme.breakpoints.down('md')]: {
          fontSize: '32px',
          lineHeight: '48px'
        }
      }
    }
  }
}
