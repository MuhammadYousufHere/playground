import { Box, Link, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { styles } from './styles'

export function Footer() {
  const theme = useTheme()
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        fontFamily: 'Poppins',
        flexGrow: 1,
        fontSize: '0.76rem',
        flexShrink: 0,
        minHeight: '50px',
        mt: 2,
        pb: 0.8
      }}
    >
      <div>
        <Link color={theme.colors.text} href={'https://auxin.io/'} target={'_blank'} sx={styles.link}>
          Auxin Security
        </Link>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <Link color={theme.colors.text} href={'https://auxin.io/about'} target={'_blank'} sx={styles.link}>
          About Us
        </Link>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <Link color={theme.colors.text} href={'https://auxin.io/blog'} target={'_blank'} sx={styles.link}>
          Blog
        </Link>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <Typography color={theme.colors.text} sx={{ display: 'inline', fontFamily: 'inherit', fontSize: 'inherit' }}>
          {`${import.meta.env.VITE_APP_BUILD_VERSION ?? 'v 0.0.1'}`}
        </Typography>
      </div>
    </Box>
  )
}
