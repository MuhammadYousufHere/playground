import { Box } from '@mui/material'
import { type PropsWithChildren, FormEventHandler } from 'react'
import { theme } from '@/theme/theme'

export default function Form({
  onSubmit,
  children
}: PropsWithChildren<{ onSubmit: FormEventHandler<HTMLFormElement> }>) {
  return (
    <Box component="form" onSubmit={onSubmit} maxWidth={theme.inputField.minWidth} width="100%">
      {children}
    </Box>
  )
}
