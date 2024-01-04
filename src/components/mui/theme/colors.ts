export type ChartColors = {
  critical: string
  high: string
  medium: string
  low: string
  info: string
}
const chartColors: ChartColors = {
  critical: '#FF3D2E',
  high: '#FF8B2E',
  medium: '#D8CF32',
  low: '#61FF82',
  info: '#61BAFF'
}

const commonColors = {
  black: '#000000',
  white: '#FFFFFF',
  red: '#EB5545',
  yellow: '#F9D74A'
}
export const colorsLight = {
  activeBackground: '#D6E4FF',
  baseBlue: '#5091EB',
  baseGreen: '#41BE91',
  baseOrange: '#FF6E32',
  basePink: '#F53C69',
  basePurple: '#C341F0',
  baseYellow: '#FFC33C',
  blue: '#3985F7',
  green: '#68CD67',
  grey100: '#8E8E93',
  grey200: '#636366',
  grey300: '#48484A',
  grey400: '#2C2C2E',
  grey500: '#1C1C1E',
  grey600: '#121214',
  grey700: '#0A0A0A',
  heading1: '#212529',
  heading2: '#3a3541de',
  heading3: '#0e6ace',
  lightBlue: '#f0f9ff',
  text: '#2C2C2E',
  para: '#172b4d',
  card1: '#1f1f47',
  card2: '#ffffff',
  card3: '#ffffff',
  card4: '#ffffff',
  cardBorder: '#d1cfc8',
  ...commonColors,
  chartColors
}
const greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f']
// const greyConstant = ['#e6ebf1', '#2d3748']
export const colorsDark = {
  activeBackground: '#092957',
  activeColor: '#579dff',
  baseBlue: '#5091EB',
  baseGreen: '#41BE91',
  baseOrange: '#FF6E32',
  basePink: '#F53C69',
  basePurple: '#C341F0',
  baseYellow: '#FFC33C',
  blue: '#3985F7',
  green: '#68CD67',
  grey100: '#8E8E93',
  grey200: '#636366',
  grey300: '#48484A',
  grey400: '#2C2C2E',
  grey500: '#1C1C1E',
  grey600: '#121214',
  grey700: '#0A0A0A',
  lightBlue: '#f0f9ff',
  heading1: 'rgba(255,255,255,0.9)',
  heading2: '#ece0c6',
  heading3: '#e7ebf0',
  text: '#F6F6f6',
  para: greyAscent[1],
  card1: '#1d2125',
  card2: '#161C24',
  // card3: '#424242',
  // card3: '#010314',
  card3: '#010314',
  cardBorder: '#2d3748',
  card4: '#161617',

  ...commonColors,
  chartColors
}

export const extra = {
  contentDarker: '#172032',
  contentLight: '#2a364d',
  heading: '#171717',
  roll1: '#a3a7a9',
  roll2: '#6fa376',
  roll3: '#8eea83',
  roll4: '#31e09d',
  roll5: '#27bbe4',
  roll6: '#de79f0',
  crystallize: '#f8ba4e',
  electro: '#b25dcd',
  melt: '#ffcb65',
  vaporize: '#aaaaaa',
  burning: '#bf2818',
  swirl: '#66ffcb',
  anemo: '#61dbbb',
  shattered: '#98fffd',
  electrocharged: '#e299fd',
  superconduct: '#b7b1ff',
  overloaded: '#ff7e9a',
  geo: '#f8ba4e',
  dendro: '#b1ea29'
}
