import { type FocusEvent, useState, FunctionComponent } from 'react'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'
import styledComp from 'styled-components'
import Cookies from 'js-cookie'
import { useTheme, type Theme } from '@mui/material/styles'
import { type TextInputProps } from './types'
import ErrorMessage from './ErrorMessage'
import Tooltip from '../Tooltip'
import { responsiveTheme } from '@/theme/theme'
import { KEYS } from '@/config'
import { type PaletteMode } from '@/features/Setting/types'

const theme = responsiveTheme({ mode: Cookies.get(KEYS.theme) as PaletteMode })
export const StyledRootElement = styledComp.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`
export const StyledInput = styledComp.input`
  width: 100%;
  display: flex;
  flex-grow: 1;
  background: transparent;
  color-scheme: normal;
  border-width: 0;
  font-family: ${theme.inputField.fontFamily};
  font-size: ${theme.inputField.fontSize};
  font-weight: ${theme.inputField.fontWeight};
  line-height: ${theme.inputField.lineHeight};
  padding: ${theme.inputField.padding};
  &::placeholder {
    color: ${theme.colors.grey100};
  }

  &:focus {
    outline: none;
  }

  /* Hide number arrows - Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Hide number arrows - Firefox */
  &: [type=number] {
    -moz-appearance: textfield;
  }

  /* Change date "placeholder" text color to match other fields*/
  &[type='date']:not([value*='-'])::-webkit-datetime-edit {
    color: ${theme.colors.grey100};
  }
`

export const TextInput: FunctionComponent<TextInputProps> = ({
  disabled = false,
  endAdornment,
  errorMessage,
  label,
  onBlur,
  onFocus,
  startAdornment,
  tooltipText = '',
  widthType = 'default',
  ...rest
}) => {
  const theme = useTheme()
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  /**
   * Calls any onFocus prop being passed and then updates local state
   */
  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (onFocus) {
      onFocus(event)
    }

    setIsFocused(true)
  }

  /**
   * Calls any onBlur prop being passed and then updates local state
   */
  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(event)
    }

    setIsFocused(false)
  }
  const isLight = theme.palette.mode === 'light'
  return (
    <Stack
      direction="column"
      spacing="4px"
      sx={{
        margin: ['0 1', '0 auto', '0.4rem 0'],
        maxWidth: widthType === 'default' ? theme.inputField.maxWidth : '100%',
        opacity: disabled ? 0.5 : 1,
        textAlign: 'left',
        width: '100%',
        marginBlock: '3rem'
      }}
    >
      {!!label && (
        <Typography
          component="span"
          sx={{ fontWeight: 500, color: isLight ? theme.colors.grey300 : '#d9d9d9' }}
          ml={0.5}
        >
          {label}
        </Typography>
      )}
      {!!label && (
        <Typography color={theme.colors.grey300} columnGap={0.5} display="flex" fontWeight={500}>
          <>
            {!!tooltipText && (
              <Tooltip title={tooltipText}>
                <IconButton sx={{ padding: 0 }}>
                  <HelpIcon
                    sx={{
                      color: isLight ? theme.colors.grey300 : '#d9d9d9',
                      height: '18px',
                      width: '18px'
                    }}
                  />
                </IconButton>
              </Tooltip>
            )}
          </>
        </Typography>
      )}

      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          borderWidth: theme.inputField.borderWidth,
          borderStyle: 'solid',
          borderColor: getBorderColor(!!errorMessage, disabled, isHovered, isFocused, theme, isLight),
          borderRadius: '6px',
          overflow: 'hidden',
          background: isLight ? '#fff' : theme.colors.grey500
        }}
        // minWidth={theme.inputField.minWidth}
      >
        <StyledRootElement>
          {startAdornment}

          <StyledInput
            {...rest}
            disabled={disabled}
            onBlur={handleBlur}
            onFocus={handleFocus}
            style={{ color: theme.palette.text.primary }}
          />

          {endAdornment}
        </StyledRootElement>
      </Box>

      {!!errorMessage && <ErrorMessage message={errorMessage} />}
    </Stack>
  )
}

const getBorderColor = (
  hasError: boolean,
  isDisabled: boolean,
  isHovered: boolean,
  isFocused: boolean,
  theme: Theme,
  isLight: boolean
) => {
  if (isDisabled) {
    return theme.colors.grey400
  }

  if (hasError) {
    return theme.colors.red
  }

  if (isHovered || isFocused) {
    return isLight ? theme.colors.blue : theme.colors.white
  }

  return isLight ? theme.colors.grey100 : theme.colors.grey400
}
