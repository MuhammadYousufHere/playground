import React from 'react'
import { Box, styled, useTheme } from '@mui/material'
import { Container } from '@mui/system'
import { styles } from './styles'
import { Typography } from '../Typography'

const formatter = new Intl.NumberFormat('en-GB', {
  notation: 'compact',
  compactDisplay: 'short'
})
const DataCardLayout = styled(Box)(({ theme }) =>
  theme.unstable_sx({
    backgroundColor: theme.colors.card2,
    padding: '0',
    position: 'relative',
    borderRadius: '10px',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#d1cfc8' : '#2d3748',
    boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.05)',
    width: '100%'
  })
)
const Heading = styled(Typography)(({ theme }) =>
  theme.unstable_sx({
    // color: theme.palette.text.primary['cardTitle'],
    fontSize: '1.2rem',
    paddingTop: '0.6rem',
    fontFamily: 'Raleway Variable',
    fontWeight: 400,
    textAlign: 'center'
  })
)
const LabelBox = styled(Box)(({ theme }) =>
  theme.unstable_sx({
    backgroundColor: theme.colors.card2,
    width: 'fit-content',
    margin: 'auto',
    padding: '0 0.3rem',
    mt: -1.4,
    wordBreak: 'break-all',
    overflow: 'hidden'
  })
)
const HeadingContainer = styled(Container)(({ theme }) =>
  theme.unstable_sx({
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-end',
      pr: '12px'
    },
    position: 'relative',
    width: '100%'
  })
)
interface IProps {
  title: string
  displayNum: string | number
  withPercentage?: boolean
  background: string
  Icon: JSX.Element
  label_1: string
  label_1_data: string | number
  label_2: string
  label_2_data: string | number
  label_3: string
  label_3_data: string | number
}
function DataCard(props: IProps) {
  const {
    title,
    displayNum,
    withPercentage,
    background,
    Icon,
    label_1,
    label_1_data,
    label_2,
    label_2_data,
    label_3,
    label_3_data
  } = props
  const theme = useTheme()
  const isLight = theme.palette.mode === 'light'
  const _data = [
    {
      id: 1,
      label: label_1,
      data: label_1_data
    },
    {
      id: 2,
      label: label_2,
      data: label_2_data
    },
    {
      id: 3,
      label: label_3,
      data: label_3_data
    }
  ]
  return (
    <DataCardLayout>
      <HeadingContainer>
        <Box component="div" padding={'0.6rem'} sx={[styles.iconBox, { background: background }]}>
          {Icon}
        </Box>
        <Box sx={styles.titleBox}>
          <Heading variant="h5" noWrap>
            {title}
          </Heading>
        </Box>
      </HeadingContainer>
      <Box sx={styles.dataNumBox}>
        <Typography
          align="center"
          sx={{ fontWeight: 'bold', my: 1, fontFamily: 'Poppins', color: theme.colors.heading3 }}
          variant="h1"
          noWrap
        >
          {typeof displayNum === 'number' ? formatter.format(isNaN(displayNum) ? 0 : Number(displayNum)) : displayNum}
          {withPercentage && (
            <span
              style={{
                fontSize: '1.5rem'
              }}
            >
              %
            </span>
          )}
        </Typography>
      </Box>
      <Container sx={{ display: 'flex', gap: 0.7, pb: '0.6rem', mt: 1, px: '0.6rem' }} disableGutters>
        {_data.map((item, i) => {
          return (
            item.label &&
            (item.data || item.data === 0) && (
              <Box
                key={item.id ?? i}
                sx={{ ...styles.dataBox, borderColor: isLight ? '#d1cfc8' : 'rgba(0 ,107, 152,  0.2)' }}
              >
                <LabelBox textOverflow="ellipsis">
                  <Typography sx={styles.subItemLabel} title={item.label}>
                    {item.label}
                  </Typography>
                </LabelBox>
                <Box component={'span'}>
                  <Typography sx={styles.subItemData}>
                    {formatter.format(isNaN(item.data as number) ? 0 : Number(item.data))}
                  </Typography>
                </Box>
              </Box>
            )
          )
        })}
      </Container>
    </DataCardLayout>
  )
}

export default DataCard
