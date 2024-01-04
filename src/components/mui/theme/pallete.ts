import { alpha } from '@mui/material'
import { createTheme } from '@mui/material/styles'

import { blue, cyan, green, orange, red } from '@mui/material/colors'
import { type PaletteOptions, type Palette } from '@mui/material/styles/createPalette'

export const backgrounds = {
  light: '#f7f9fb',
  dark: '#0d1117'
}

// SETUP COLORS
const PRIMARY = {
  lighter: '#C8FACD',
  light: '#5BE584',
  main: '#0e6ace',
  dark: '#007B55',
  darker: '#005249'
}
const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A'
}
const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A'
}
const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D'
}
const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01'
}
const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E'
}
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8)
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const themeColors = (colors: any) => {
  const { blue, red, cyan, green, grey, gold } = colors
  const greyColors = {
    0: grey[0],
    50: grey[1],
    100: grey[2],
    200: grey[3],
    300: grey[4],
    400: grey[5],
    500: grey[6],
    600: grey[7],
    700: grey[8],
    800: grey[9],
    900: grey[10],
    A50: grey[15],
    A100: grey[11],
    A200: grey[12],
    A400: grey[13],
    A700: grey[14],
    A800: grey[16],
    A900: grey[17]
  }
  const contrastText = '#fff'

  return {
    primary: {
      lighter: blue[0],
      100: blue[1],
      200: blue[2],
      light: blue[3],
      400: blue[4],
      main: blue[5],
      dark: blue[6],
      700: blue[7],
      darker: blue[8],
      900: blue[9],
      contrastText
    },
    secondary: {
      lighter: greyColors[100],
      100: greyColors[100],
      200: greyColors[200],
      light: greyColors[300],
      400: greyColors[400],
      main: greyColors[500],
      600: greyColors[600],
      dark: greyColors[700],
      800: greyColors[800],
      darker: greyColors[900],
      A100: greyColors[0],
      A200: greyColors.A400,
      A300: greyColors.A700,
      contrastText: greyColors[0]
    },
    error: {
      light: red[2],
      main: red[4],
      dark: red[7],
      contrastText
    },
    warning: {
      light: gold[3],
      main: gold[5],
      dark: gold[9],
      contrastText: greyColors[100]
    },
    info: {
      light: cyan[3],
      main: cyan[5],
      dark: cyan[7],
      contrastText
    },
    success: {
      light: green[3],
      main: green[5],
      dark: green[7],
      contrastText
    },
    grey: greyColors
  }
}
const COMMON = {
  common: { black: '#000000', white: '#ffffff' },
  primary: { ...PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#fff' },
  info: { ...INFO, contrastText: '#fff' },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: '#fff' }
}
const greyPrimary: string[] = [
  '#ffffff',
  '#fafafa',
  '#f5f5f5',
  '#f0f0f0',
  '#d9d9d9',
  '#bfbfbf',
  '#8c8c8c',
  '#595959',
  '#262626',
  '#141414',
  '#000000'
]
const greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f']
const greyConstant = ['#e6ebf1', '#2d3748']

const colors = {
  grey: [...greyPrimary, ...greyAscent, ...greyConstant],
  blue: [blue],
  red: [red],
  cyan: [cyan],
  green: [green],
  gold: [orange]
}
const paletteColor = themeColors(colors)

export interface TypeAction {
  active: string
  hover: string
  hoverOpacity: number
  selected: string
  selectedOpacity: number
  disabled: string
  disabledOpacity: number
  disabledBackground: string
  focus: string
  focusOpacity: number
  activatedOpacity: number
}

type AppPallete = {
  light: Palette
  dark: PaletteOptions
}
export const defaultThemeDark = createTheme({ palette: { mode: 'dark' }, customShadows: {} })
export const defaultThemeLight = createTheme({ palette: { mode: 'light' }, customShadows: {} })

export const palette: AppPallete = {
  light: {
    ...defaultThemeLight.palette,
    ...COMMON,
    background: {
      paper: '#ffffff',
      default: backgrounds.light
    },
    text: {
      primary: paletteColor.grey[700],
      secondary: paletteColor.grey[500],
      disabled: paletteColor.grey[400]
    },
    action: {
      ...defaultThemeLight.palette.action,
      disabled: paletteColor.grey[300]
    }
  },
  dark: {
    ...defaultThemeDark.palette,
    ...COMMON,
    background: {
      paper: backgrounds.dark,
      default: backgrounds.dark
    },
    text: { primary: '#f3f6f9', secondary: GREY[500], disabled: GREY[600] }
  }
}
