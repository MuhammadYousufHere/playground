import React, { useRef, ElementRef } from 'react'
import _ from 'lodash'
import { FormControlLabel, Radio, Stack } from '@mui/material'
import { useTheme, styled } from '@mui/material/styles'
import { Typography } from '..'
import { shouldForwardProp } from '@/@types'

interface IProps {
  value: string
  label: string
  description: string
  isActive: boolean
  width?: string
}
type WrapperProps = { isActive: boolean }
export const Wrapper = styled(Stack, {
  shouldForwardProp: prop => shouldForwardProp<WrapperProps>(['isActive'], prop)
})<WrapperProps>(({ theme, isActive }) => ({
  border: '2px solid',
  ...(theme.palette.mode === 'light' && {
    borderColor: theme.colors.grey100,
    background: '#F1F5F9',
    backgroundImage: 'linear-gradient(to top, #ede9fe,rgb(237 233 254 / 0))'
  }),
  ...(theme.palette.mode === 'dark' && { borderColor: theme.colors.grey400, background: theme.colors.grey500 }),
  ...(isActive && { borderColor: theme.colors.baseBlue }),
  padding: '1rem',
  borderRadius: '6px',
  maxWidth: '31%',
  cursor: 'pointer',
  transition: '.3s ease all'
}))

export default function RadioItem({ value, label, description, isActive, width }: IProps) {
  const theme = useTheme()
  const ref = useRef<ElementRef<'input'>>(null)
  const handleClick = () => {
    if (ref.current) {
      ref.current.click()
    }
  }
  return (
    <Wrapper isActive={isActive} sx={{ ...(width && { maxWidth: `${width} !important` }) }} onClick={handleClick}>
      <FormControlLabel
        value={value}
        sx={{ color: theme.palette.text.primary }}
        checked={isActive}
        control={
          <Radio
            size="small"
            inputRef={ref}
            sx={{
              color: theme.colors.grey200,
              '&.Mui-checked': {
                color: theme.colors.blue
              }
            }}
          />
        }
        label={_.capitalize(label)}
      ></FormControlLabel>
      <Typography variant="body2" color="grey100">
        {description}
      </Typography>
    </Wrapper>
  )
}
