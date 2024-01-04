import { Stack, useMediaQuery, Container, ContainerProps } from '@mui/material'
import { IconType } from 'react-icons'
import { Theme, alpha, styled } from '@mui/material/styles'
import { PropsWithChildren } from 'react'
import { SxProps } from '@mui/system'
import { Typography } from '..'

interface IProps extends ContainerProps {
  label: string
  Icon: IconType
  cardStyle?: SxProps<Theme>
}
const ActionStack = styled(Stack)(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.palette.mode === 'light' ? '#d1cfc8' : '#2d3748',
  borderRadius: '0.5rem',
  flexDirection: 'column',
  padding: '0.7rem',
  marginTop: '0.4rem',
  gap: '1rem'
}))
const CardContainer = styled(Container)(({ theme }) => ({
  padding: '0.7rem',
  backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : alpha('#201a2c', 0.3),
  zIndex: 0,
  borderRadius: '0.5rem',
  // boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)',
  border: '1px solid',
  borderColor: theme.palette.mode === 'light' ? '#E5E5E5' : '#334152',
  boxShadow: 'rgb(0 0 0 / 6%) 0px 3px 3px -2px, rgb(0 0 0 / 4%) 0px 3px 4px 0px, rgb(0 0 0 / 4%) 0px 1px 8px 0px '
}))
const UiCard = ({ label, Icon, children, cardStyle, ...rest }: PropsWithChildren<IProps>) => {
  const matches = useMediaQuery('(min-width:800px)')

  return (
    <CardContainer disableGutters sx={{ width: '100%' }} {...rest}>
      <Typography variant="subtitle1">
        {Icon && <Icon style={{ marginBottom: '-2px', fontSize: '1rem' }} />} {label}
      </Typography>
      <ActionStack
        sx={{
          zIndex: 0,
          justifyContent: matches ? 'space-between' : 'flex-start',
          ...cardStyle
        }}
      >
        {children}
      </ActionStack>
    </CardContainer>
  )
}

export { UiCard }
