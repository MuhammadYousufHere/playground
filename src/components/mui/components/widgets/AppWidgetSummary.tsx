import React from 'react'
import { useTranslation } from 'react-i18next'

import { alpha, useTheme, styled } from '@mui/material/styles'
import { Box, Card, Stack } from '@mui/material'
import { type IconType } from 'react-icons'
import { Typography } from '..'
import { fNumber, fPercent } from '@/utils'

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16)
}))

interface IAppWidgetSummary {
  backgroundIconColor: string
  percent: number
  title: string
  total: number
  icon: string
  Icon: IconType
}
export default function AppWidgetSummary({
  title,
  percent,
  total,
  icon,
  Icon,
  backgroundIconColor
}: IAppWidgetSummary) {
  const { t } = useTranslation('ui', { keyPrefix: 'organization.cards' })
  const theme = useTheme()

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 3,
        border: '1px solid',
        borderColor: theme.colors.cardBorder,
        background: theme.colors.card2
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1">{title}</Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <IconWrapperStyle
            sx={{
              ...(percent < 0 && {
                color: 'error.main',
                bgcolor: alpha(theme.palette.error.main, 0.16)
              })
            }}
          >
            <Icon />
          </IconWrapperStyle>
          <Typography variant="subtitle2" mt={3}>
            {percent > 0 && '+'}
            {fPercent(percent)}
          </Typography>
        </Stack>

        <Typography variant="h3">
          {fNumber(total)}
          {title === t('wallet') && ' $'}
        </Typography>
      </Box>

      <div style={{ backgroundColor: backgroundIconColor, borderRadius: 30, padding: 20 }}>
        <img src={icon} alt="" className="h-5 w-5 text-white" aria-hidden="true" />
      </div>
    </Card>
  )
}
