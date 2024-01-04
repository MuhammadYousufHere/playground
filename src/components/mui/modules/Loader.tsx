import { HTMLAttributes } from 'react'
import { alpha, styled } from '@mui/material/styles'
import { Box, LinearProgress } from '@mui/material'
import { m } from 'framer-motion'
import { Typography } from '@/components'

interface WrapperProps extends HTMLAttributes<HTMLDivElement> {
  isDashboard: boolean
}

const LoaderWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2001,
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2)
  }
}))
const RootStyle = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 99999,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default
}))

const Loader = ({ isDashboard, ...rest }: WrapperProps) => (
  <LoaderWrapper>
    <LinearProgress color="primary" />
    {!isDashboard && (
      <RootStyle {...rest}>
        <m.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 360 }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeatDelay: 1,
            repeat: Infinity
          }}
        >
          <Typography>Platform Admin</Typography>
        </m.div>

        <Box
          component={m.div}
          animate={{
            scale: [1.2, 1, 1, 1.2, 1.2],
            rotate: [270, 0, 0, 270, 270],
            opacity: [0.25, 1, 1, 1, 0.25],
            borderRadius: ['25%', '25%', '50%', '50%', '25%']
          }}
          transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
          sx={{
            width: 100,
            height: 100,
            borderRadius: '25%',
            position: 'absolute',
            border: theme => `solid 3px ${alpha(theme.palette.primary.dark, 0.24)}`
          }}
        />

        <Box
          component={m.div}
          animate={{
            scale: [1, 1.2, 1.2, 1, 1],
            rotate: [0, 270, 270, 0, 0],
            opacity: [1, 0.25, 0.25, 0.25, 1],
            borderRadius: ['25%', '25%', '50%', '50%', '25%']
          }}
          transition={{
            ease: 'linear',
            duration: 3.2,
            repeat: Infinity
          }}
          sx={{
            width: 120,
            height: 120,
            borderRadius: '25%',
            position: 'absolute',
            border: theme => `solid 8px ${alpha(theme.palette.primary.dark, 0.24)}`
          }}
        />
      </RootStyle>
    )}
  </LoaderWrapper>
)

export default Loader
