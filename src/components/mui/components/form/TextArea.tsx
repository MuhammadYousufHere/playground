import { type FocusEvent, useState, FunctionComponent, type TextareaHTMLAttributes } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import styledComp from 'styled-components'
import Cookies from 'js-cookie'
import { useTheme, type Theme } from '@mui/material/styles'
import ErrorMessage from '../elements/ErrorMessage'
import { responsiveTheme } from '@/theme/theme'
import { KEYS } from '@/config'
import { type PaletteMode } from '@/features/Setting/types'
import { WidthType } from '@/@types'

const theme = responsiveTheme({ mode: Cookies.get(KEYS.theme) as PaletteMode })

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly label?: string
  readonly errorMessage?: string
  readonly startAdornment?: JSX.Element
  readonly endAdornment?: JSX.Element
  readonly widthType?: WidthType
  readonly minHeight?: string
  readonly isOptional?: boolean
}
const StyledRootElement = styledComp.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`
const StyledTextAreaElement = styledComp.textarea`
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
  min-height: 100px;
  max-height: 250px;
  &::placeholder {
    color: ${theme.colors.grey100};
  }

  &:focus {
    outline: none;
  }
`
export const TextArea: FunctionComponent<TextAreaProps> = ({
  errorMessage,
  label,
  onFocus,
  onBlur,
  startAdornment,
  endAdornment,
  disabled = false,
  widthType = 'default',
  minHeight = '',
  isOptional,
  ...rest
}) => {
  const theme = useTheme()
  const isLight = theme.palette.mode === 'light'

  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  /**
   * Calls any onFocus prop being passed and then updates local state
   */
  const handleFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
    if (onFocus) {
      onFocus(event)
    }

    setIsFocused(true)
  }

  /**
   * Calls any onBlur prop being passed and then updates local state
   */
  const handleBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    if (onBlur) {
      onBlur(event)
    }

    setIsFocused(false)
  }

  return (
    <Stack
      direction="column"
      spacing="4px"
      sx={{
        opacity: disabled ? 0.5 : 1,
        width: '100%',
        textAlign: 'left',
        [theme.breakpoints.down('md')]: {
          margin: '0 auto',
          maxWidth: widthType === 'default' ? theme.inputField.maxWidth : '100%'
        }
      }}
    >
      {!!label && (
        <Typography color={isLight ? theme.colors.grey300 : '#d9d9d9'} columnGap={0.5} display="flex" fontWeight={500}>
          {label}
          {isOptional && (
            <Typography color={isLight ? theme.colors.grey200 : '#d9d9d9'} component="span" marginLeft="auto">
              Optional
            </Typography>
          )}
        </Typography>
      )}

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          borderWidth: theme.inputField.borderWidth,
          borderStyle: 'solid',
          borderColor: getBorderColor(!!errorMessage, disabled, isHovered, isFocused, theme, isLight),
          borderRadius: '4px',
          overflow: 'hidden',
          background: isLight ? '#fff' : theme.colors.grey500
        }}
      >
        <StyledRootElement>
          {startAdornment}

          <StyledTextAreaElement
            {...rest}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            rows={1}
            style={{ ...(minHeight && { minHeight }), color: theme.palette.text.primary }}
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

  return isLight ? theme.colors.grey200 : theme.colors.grey400
}
