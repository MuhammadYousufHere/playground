import { Box, Stack, StackProps } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { type IconType } from 'react-icons'
import { type PropsWithChildren } from 'react'
import { styles } from './style'
import { Button, Typography } from '..'
import { titleBg } from '@/assets'

interface IProps extends StackProps {
  multiButton: boolean
  Icon: IconType
  onClick: () => void
  button: boolean
  toggle: JSX.Element
  buttonLabel: string
  options: string[]
}
export function PageTitle({
  title,
  button,
  Icon,
  onClick,
  buttonLabel,
  toggle,
  mx,
  children
}: PropsWithChildren<Partial<IProps>>) {
  const theme = useTheme()
  const isLight = theme.palette.mode === 'light'
  return (
    <Stack
      sx={{
        ...styles.box,
        background: `url(${titleBg})`,
        backgroundColor: '#e9f0ff',
        backgroundSize: 'cover',
        backgroundPosition: 'right',
        position: 'relative',
        transition: '.3s ease all',
        ...(isLight && { borderColor: '#b7cdff' })
      }}
    >
      <Box sx={{ position: 'absolute', bottom: '-7px', left: 0, zIndex: 0 }}>
        <svg width="333" height="61" viewBox="0 0 333 61" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            opacity="0.4"
            d="M-0.322477 0.641086L-0.418408 0.55164L-9.20939 59.4297L23.6588 106.206L154.575 130.423C236.759 117.931 383.93 93.3326 315.142 94.879C246.355 96.4253 215.362 64.2785 215.362 64.2785C215.362 64.2785 185.497 26.9117 117.864 33.4279C42.6115 40.6783 10.6143 10.8399 -0.322477 0.641086Z"
            fill="rgba(126, 166, 255, 0.4)"
          ></path>
        </svg>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" mx={mx} sx={styles.title} color="para">
          {title}
        </Typography>
        <Box sx={styles.btn}>
          {button && (
            <Button as="border" Icon={Icon} sx={{ minWidth: '160px' }} onClick={onClick}>
              {buttonLabel}
            </Button>
          )}
          {toggle ? toggle : null}
        </Box>
      </Box>
      {children}
      <Box sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}>
        <svg width="387" height="100" viewBox="0 0 447 116" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            opacity="0.4"
            d="M55.2678 22.3777C-49.5465 -14.1611 7.16534 -48.8529 136.242 -34.0647L214.579 -30.0724L448.26 -8.82579L459.956 104.858C396.401 148.386 406.862 51.7166 297.501 67.1292C188.139 82.5419 225.278 33.322 176.928 20.0906C128.579 6.8592 91.4243 34.9821 55.2678 22.3777Z"
            fill="rgba(126, 166, 255, 0.4)"
          ></path>
        </svg>
      </Box>
    </Stack>
  )
}
