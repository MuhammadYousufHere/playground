import ErrorIcon from '@mui/icons-material/Error'
import { Box, Collapse, Typography, type BoxProps } from '@mui/material'

interface IProps extends BoxProps {
  isError: boolean
  message: string
}
export const FormError = ({ isError, message, sx }: IProps) => {
  return (
    <Collapse in={isError} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          ...sx
        }}
      >
        <Box
          sx={{
            color: '#d32f2f',
            bgcolor: '#ff000029',
            display: 'flex',
            padding: { xs: '4px 0', sm: '10px 0' },
            alignItems: 'center',
            border: '1px solid #e01e5a66',
            borderRadius: '4px',
            width: '100%'
          }}
        >
          <ErrorIcon style={{ margin: '0 8px', alignSelf: 'flex-start' }} />
          <Typography variant="body2" sx={{ fontFamily: 'Poppins', wordBreak: 'break-all', pr: 1 }}>
            {message}
          </Typography>
        </Box>
      </Box>
    </Collapse>
  )
}
