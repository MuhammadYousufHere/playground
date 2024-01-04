// import { type FocusEvent, useState, ForwardedRef, ForwardRefRenderFunction, forwardRef } from 'react'
import { type FocusEvent, useState, ForwardRefRenderFunction, forwardRef } from 'react'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'
import { useTheme, type Theme } from '@mui/material/styles'
import { type TextInputProps } from '../elements/types'
import ErrorMessage from '../elements/ErrorMessage'
import Tooltip from '../Tooltip'
import { StyledInput, StyledRootElement } from '../elements/TextInput'

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75'
}

const Input: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = (
  {
    disabled = false,
    endAdornment,
    errorMessage,
    label,
    onBlur,
    onFocus,
    startAdornment,
    tooltipText = '',
    widthType = 'default',
    containerClassname,
    ...rest
  },
  ref
) => {
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
  const theme = useTheme()
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
        <Typography color={theme.colors.grey300} columnGap={0.5} display="flex" fontWeight={500}>
          <>
            <Typography component="span" sx={{ fontWeight: 500 }}>
              {label}
            </Typography>

            {!!tooltipText && (
              <Tooltip title={tooltipText}>
                <IconButton sx={{ padding: 0 }}>
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
          </>
        </Typography>
      )}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={containerClassname}
        sx={{
          borderWidth: theme.inputField.borderWidth,
          borderStyle: 'solid',
          borderColor: getBorderColor(!!errorMessage, disabled, isHovered, isFocused, theme, isLight),
          borderRadius: '6px',
          overflow: 'hidden',
          '&.focused': {
            boxShadow: `0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]}`
          },
          background: isLight ? '#fff' : theme.colors.grey500
        }}
        // maxWidth={theme.inputField.maxWidth}
      >
        <StyledRootElement>
          {startAdornment}

          <StyledInput
            {...rest}
            disabled={disabled}
            onBlur={handleBlur}
            onFocus={handleFocus}
            ref={ref}
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
export default forwardRef(Input)
