import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f'
}
const HorizontalLine = styled(Box)(
  ({ theme }) => `
  background-color: ${theme.palette.mode === 'light' ? grey['100'] : grey['700']} ;
  box-shadow: 0 20px 430px -10px #d0d7de;
  height:0.8px;
  width: 100%;
`
)

export default HorizontalLine
// ${theme.colors.grey500}
