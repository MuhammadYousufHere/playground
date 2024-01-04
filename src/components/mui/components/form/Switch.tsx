import type { FunctionComponent, ReactNode } from 'react'
import {
  Box,
  Switch as MuiSwitch,
  type SwitchProps,
  type SxProps,
  styled,
  Stack,
  IconButton,
  Collapse
} from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'
import { useTheme } from '@mui/material/styles'
import Cookies from 'js-cookie'
import { Typography } from '..'
import Tooltip from '../Tooltip'
import { CloseIcon, CheckIcon } from '@/assets'
import { responsiveTheme } from '@/theme/theme'
import { type PaletteMode } from '@/features/Setting/types'
import { KEYS } from '@/config'

const theme = responsiveTheme({ mode: Cookies.get(KEYS.theme) as PaletteMode })
interface ToggleIconProps {
  readonly checked: boolean
}

const StyledSwitch = styled((props: SwitchProps) => (
  <MuiSwitch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(() => ({
  width: 44,
  height: 24,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      color: theme.colors.white,
      transform: 'translateX(20px)',
      '& + .MuiSwitch-track': {
        background: theme.gradients.btn,
        opacity: 1,
        border: 0
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: theme.colors.green,
      border: `6px solid ${theme.colors.white}`
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.colors.grey100
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box'
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    background: theme.colors.grey400,
    opacity: 1
  }
}))
const ToggleIcon: FunctionComponent<ToggleIconProps> = ({ checked }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        backgroundColor: theme.colors.white
      }}
    >
      {checked ? <CheckIcon /> : <CloseIcon />}
    </Box>
  )
}
export const Switch: FunctionComponent<SwitchProps> = props => {
  return <StyledSwitch icon={<ToggleIcon checked={false} />} checkedIcon={<ToggleIcon checked={true} />} {...props} />
}

export interface SwitchInputProps extends SwitchProps {
  readonly title: string
  readonly description?: string
  readonly includeBorder?: boolean
  readonly tooltipText?: string
  readonly children?: ReactNode
}

/**
 * Switch toggle with a title, description, and optional border.
 */
export const SwitchInput: FunctionComponent<SwitchInputProps> = ({
  title,
  description,
  includeBorder = true,
  tooltipText = '',
  children,
  ...props
}) => {
  const theme = useTheme()
  const isLight = theme.palette.mode === 'light'

  const borderStyles: SxProps = includeBorder
    ? {
        background: isLight ? '#F1F5F9' : theme.colors.grey500,
        ...(isLight && {
          backgroundImage: 'linear-gradient(to top, #ede9fe,rgb(237 233 254 / 0))'
        }),
        color: theme.palette.text.primary,
        border: `2px solid ${isLight ? theme.colors.grey100 : theme.colors.grey400}`,
        borderRadius: '6px'
      }
    : {}

  return (
    <Stack sx={{ my: 2, p: 2, ...borderStyles }}>
      <Stack
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Stack pr={[0, 0, 4]}>
          <Stack display="flex" flexDirection="row">
            <Typography pr={1} variant={description ? 'subtitle1' : 'h6'}>
              {title}
            </Typography>

            {!!tooltipText && (
              <Tooltip title={tooltipText}>
                <IconButton sx={{ padding: [1, 1, 0] }}>
                  <HelpIcon
                    sx={{
                      color: theme.colors.grey100,
                      height: '18px',
                      width: '18px'
                    }}
                  />
                </IconButton>
              </Tooltip>
            )}
          </Stack>

          {!!description && (
            <Typography pt={0.75} pr={1} variant="subtitle2">
              {description}
            </Typography>
          )}
        </Stack>
        <Switch {...props} />
      </Stack>
      <Collapse in={props.checked} timeout={800} mountOnEnter>
        {children}
      </Collapse>
    </Stack>
  )
}

export default SwitchInput
