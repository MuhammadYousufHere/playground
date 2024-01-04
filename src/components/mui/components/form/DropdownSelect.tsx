import { ForwardRefRenderFunction, ForwardedRef, HTMLProps, KeyboardEvent, forwardRef } from 'react'
import { useTheme, styled } from '@mui/material/styles'
import { useAutocomplete } from '@mui/base'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Box } from '@mui/material'
import { Input as TextInput } from '@/components/form'
import { WidthType } from '@/@types'

const ResultsList = styled('ul')(({ theme }) => ({
  backgroundColor: theme.colors.card3,
  borderRadius: '4px',
  border: `2px solid ${theme.colors.blue}`,
  listStyle: 'none',
  margin: '4px 0 0',
  maxHeight: '200px',
  overflow: 'auto',
  padding: 0,
  position: 'absolute',
  width: '100%',
  zIndex: 10,
  marginTop: '1px',
  fontFamily: 'Poppins',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  colorScheme: 'normal',
  color: theme.palette.text.primary,
  '& li': {
    cursor: 'pointer',
    padding: '12px 12px',
    minHeight: '44px',

    '&.Mui-focused': {
      backgroundColor: theme.palette.mode === 'light' ? theme.colors.lightBlue : '#161617'
    }
  }
}))

const NoResultsText = styled('span')(({ theme }) => ({
  backgroundColor: theme.colors.card3,
  borderRadius: '4px',
  border: `2px solid ${theme.colors.grey100}`,
  color: theme.palette.text.primary,
  margin: '4px 0 0',
  padding: '12px 12px',
  position: 'absolute',
  width: '100%',
  marginTop: '1px',
  fontFamily: 'Poppins'
}))

type Value = string | number
type Options = {
  label: string
  value: Value
}
export interface DropdownSelectProps extends Omit<HTMLProps<HTMLInputElement>, 'as' | 'ref'> {
  readonly disabled?: boolean
  readonly errorMessage?: string
  readonly handleChange?: (_newValue: Options) => void
  readonly label?: string
  readonly isOptional?: boolean
  readonly name: string
  readonly tooltipText?: string
  readonly noResultsText?: string
  readonly options: Options[]
  readonly placeholder?: string
  readonly widthType?: WidthType
  readonly startAdornment?: JSX.Element
  readonly glowAdornment?: boolean
}

const DropdownSelect: ForwardRefRenderFunction<HTMLInputElement, DropdownSelectProps> = (
  {
    disabled,
    errorMessage,
    handleChange,
    label,
    name,
    noResultsText = 'Nothing found',
    options,
    placeholder,
    value,
    widthType,
    startAdornment,
    glowAdornment = false,

    ...rest
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _ref: ForwardedRef<HTMLInputElement>
) => {
  const theme = useTheme()

  const {
    getInputProps,
    getListboxProps,
    getOptionProps,
    getRootProps,
    groupedOptions,
    popupOpen,
    inputValue,
    focused,
    dirty
  } = useAutocomplete({
    id: name,
    getOptionLabel: option => option.label,
    onChange: (_event, newValue) => {
      if (handleChange) {
        handleChange(newValue as Options)
      }
    },
    isOptionEqualToValue(option, currOpt) {
      return option.value === currOpt.value
    },
    options
  })
  const hasResults = groupedOptions.length > 0
  const showNoResults = !hasResults && popupOpen
  /**
   * This prevents a form submission when input
   * text does not match any options.
   */
  const preventFormSubmit = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' && inputValue !== value) event.preventDefault()
  }

  return (
    <Box
      sx={{
        maxWidth: widthType === 'default' ? theme.inputField.maxWidth : null,
        position: 'relative',
        width: '100%'
      }}
    >
      <div {...getRootProps()} style={{ width: '100%' }}>
        <TextInput
          // ref={ref}
          {...rest}
          {...getInputProps()}
          disabled={disabled}
          value={!dirty && !focused ? value : focused && !dirty ? inputValue : dirty && focused ? inputValue : value}
          startAdornment={startAdornment}
          containerClassname={glowAdornment && focused ? 'focused' : undefined}
          endAdornment={
            <ArrowDropDownIcon
              sx={{
                color: theme.palette.text.primary,
                transform: popupOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
                transition: 'transform 200ms ease-in'
              }}
            />
          }
          errorMessage={errorMessage}
          label={label}
          name={name}
          placeholder={placeholder}
          onKeyDown={preventFormSubmit}
        />
      </div>

      {hasResults && (
        <ResultsList {...getListboxProps()}>
          {(groupedOptions as typeof options).map((option, index) => (
            <li {...getOptionProps({ option, index })} key={index}>
              {option.label}
            </li>
          ))}
        </ResultsList>
      )}

      {showNoResults ? <NoResultsText>{noResultsText}</NoResultsText> : null}
    </Box>
  )
}

export default forwardRef(DropdownSelect)
