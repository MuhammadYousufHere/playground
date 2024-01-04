import { useTheme } from '@mui/material/styles'
import { Stack } from '@mui/material'
import { BiErrorCircle } from 'react-icons/bi'
import { Typography } from '..'

interface IProps {
  message: string
}
const ErrorMessage = ({ message }: IProps) => {
  const theme = useTheme()
  return (
    <Stack flexDirection="row" alignItems="center" gap={1}>
      <BiErrorCircle style={{ color: theme.colors.red, width: '18px' }} />
      <Typography
        sx={{
          ...theme.typography.body1,
          color: theme.colors.red
        }}
      >
        {message}
      </Typography>
    </Stack>
  )
}

export default ErrorMessage
