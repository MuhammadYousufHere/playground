import { type InputHTMLAttributes } from 'react'
import { SxProps } from '@mui/material'
import { type WidthType } from '@/@types'
export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly endAdornment?: JSX.Element
  readonly errorMessage?: string
  readonly tooltipText?: string
  readonly label?: string
  readonly startAdornment?: JSX.Element
  readonly widthType?: WidthType
  readonly sx?: SxProps
  readonly containerClassname?: string
}
