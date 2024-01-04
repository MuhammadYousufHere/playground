import { Box, BoxProps } from '@mui/material'
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress'

export function FacebookCircularProgress(props: BoxProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        ...props.sx
      }}
    >
      <CircularProgress
        variant="determinate"
        sx={{
          color: theme => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
        }}
        size={20}
        thickness={3}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: theme => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round'
          }
        }}
        size={20}
        thickness={3}
      />
    </Box>
  )
}
