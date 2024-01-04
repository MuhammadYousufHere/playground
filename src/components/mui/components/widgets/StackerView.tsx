// @mui
import { Stack, Box, CircularProgress } from '@mui/material'
import { IconType } from 'react-icons'
import { Typography } from '..'
import { fCurrency, fShortenNumber } from '@/utils'

interface IProps {
  title: string
  color: string
  Icon: IconType
  percent?: number
  count?: number
  total?: number
}
export function StackerView({ title, total, Icon, color, percent, count }: IProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: 1, minWidth: 200 }}>
      <Stack alignItems="center" justifyContent="center" sx={{ position: 'relative' }}>
        <Icon style={{ color, width: 24, height: 24, position: 'absolute' }} />

        <CircularProgress variant="determinate" value={percent} size={56} thickness={4} sx={{ color, opacity: 0.48 }} />

        <CircularProgress
          variant="determinate"
          value={100}
          size={56}
          thickness={4}
          sx={{ color: '#919EAB', position: 'absolute', top: 0, left: 0, opacity: 0.28 }}
        />
      </Stack>

      <Stack spacing={0.5} sx={{ ml: 2 }}>
        <Typography variant="h6">{title}</Typography>

        <Typography variant="subtitle2">
          {fShortenNumber(total as number)}{' '}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Members
          </Box>
        </Typography>
        {count && (
          <Typography variant="subtitle2" sx={{ color }}>
            {fCurrency(count as number)}$
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}
