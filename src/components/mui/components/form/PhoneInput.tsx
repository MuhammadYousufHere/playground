import { type FocusEvent, useState, FunctionComponent } from 'react'
import { Box, Stack, Typography, IconButton } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'
import { useTheme, type Theme, SxProps } from '@mui/material/styles'
import PhoneInput, { PhoneInputProps } from 'react-phone-input-2'
import Tooltip from '../Tooltip'
import { ErrorMessage } from '../elements'
import 'react-phone-input-2/lib/style.css'
import { WidthType } from '@/@types'
import './styles.css'
interface IPhoneInput extends PhoneInputProps {
  readonly sxInputContainer?: SxProps<Theme>
  readonly errorMessage?: string
  readonly widthType?: WidthType
  readonly label?: string
  readonly name?: string
  readonly tooltipText?: string
}
const PInput: FunctionComponent<IPhoneInput> = ({
  errorMessage,
  label,
  onFocus,
  onBlur,
  disabled = false,
  value,
  onClick,
  onChange,
  name,
  widthType = 'default',
  tooltipText,
  sxInputContainer,
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  /**
   * Calls any onFocus prop being passed and then updates local state
   */
  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (onFocus) {
      onFocus(event, {})
    }

    setIsFocused(true)
  }

  /**
   * Calls any onBlur prop being passed and then updates local state
   */
  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(event, {})
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
        marginBlock: '3rem',
        zIndex: 3
      }}
    >
      {!!label && (
        <Typography
          component="span"
          ml={0.5}
          sx={{ fontWeight: 500, color: isLight ? theme.colors.grey300 : '#d9d9d9' }}
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
        justifyContent="space-between"
        alignItems="center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          // background: disabled ? '#e3e4e6' : theme.colors.white,
          ...sxInputContainer
        }}
      >
        <PhoneInput
          inputProps={{ name }}
          country="us"
          value={value}
          onClick={onClick}
          onChange={onChange}
          buttonStyle={{
            borderWidth: '2px',
            borderColor: getBorderColor(!!errorMessage, disabled, isHovered, isFocused, theme, isLight),
            borderRadius: '6px 0 0 6px',
            background: isLight ? '#fff' : theme.colors.grey500,
            color: theme.palette.text.primary
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          searchPlaceholder="Search"
          dropdownStyle={{
            border: `2px solid ${getBorderColor(!!errorMessage, disabled, isHovered, isFocused, theme, isLight)}`,
            borderRadius: '6px',
            overflow: 'auto',
            background: isLight ? '#fff' : theme.colors.grey500,
            color: theme.palette.text.primary
          }}
          containerStyle={{
            width: '100%'
          }}
          inputStyle={{
            width: '100%',
            borderColor: getBorderColor(!!errorMessage, disabled, isHovered, isFocused, theme, isLight),
            background: isLight ? '#fff' : theme.colors.grey500,
            color: theme.palette.text.primary,
            paddingBlock: '22px',
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            borderWidth: '2px',
            minWidth: '340px',
            borderRadius: '6px'
          }}
          {...rest}
        />
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

export default PInput
