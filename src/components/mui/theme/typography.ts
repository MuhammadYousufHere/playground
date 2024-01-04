import { type TypographyVariantsOptions } from '@mui/material/styles'

export const themeTypography = (fontFamily: string): TypographyVariantsOptions => ({
  fontFamily,
  fontSize: 16,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  htmlFontSize: 16,
  h1: {
    fontWeight: 600,
    fontSize: '2.375rem',
    lineHeight: 1.21,
    fontFamily: 'Raleway Variable, sans-serif',
    fontStyle: 'normal'
  },
  h2: {
    fontWeight: 600,
    fontSize: '1.875rem',
    fontStyle: 'normal',
    lineHeight: 1.27
  },
  h3: {
    fontWeight: 600,
    fontSize: '1.5rem',
    fontStyle: 'normal',
    lineHeight: 1.33,
    fontFamily
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.25rem',
    fontStyle: 'normal',
    lineHeight: 1.4
  },
  h5: {
    fontWeight: 600,
    fontStyle: 'normal',
    fontSize: '1rem',
    lineHeight: 1.5
  },
  h6: {
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: '0.875rem',
    lineHeight: 1.57
  },
  caption: {
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: '0.75rem',
    lineHeight: 1.66
  },
  body1: {
    fontSize: '0.875rem',
    fontStyle: 'normal',
    lineHeight: 1.57
  },
  body2: {
    fontSize: '0.75rem',
    fontStyle: 'normal',
    lineHeight: 1.66
  },
  subtitle1: {
    fontSize: '0.875rem',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 1.57
  },
  subtitle2: {
    fontSize: '0.75rem',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 1.66
  },
  overline: {
    lineHeight: 1.66
  },
  button: {
    fontStyle: 'normal',
    textTransform: 'unset'
  }
})
