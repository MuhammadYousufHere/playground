import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const Divider = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '1px',
  background: theme.colors.cardBorder,
  ...(theme.palette.mode === 'light' && { boxShadow: '0px 1px 0px #ffffff' }),
  marginTop: '6px'
}))
