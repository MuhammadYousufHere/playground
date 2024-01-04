import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'

const GridStyledLink = styled(Link)(({ theme }) => ({
  color: theme.colors.baseBlue,
  textDecoration: 'none',
  '&: hover': {
    textDecoration: 'underline',
    textUnderlineOffset: '2px'
  }
}))

export { GridStyledLink }
