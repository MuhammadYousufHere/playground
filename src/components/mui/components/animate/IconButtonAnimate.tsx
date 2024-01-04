import { m } from 'framer-motion'
import { forwardRef, PropsWithChildren, ComponentPropsWithoutRef } from 'react'
import { Box, IconButton, IconButtonProps, SxProps, Theme } from '@mui/material'

interface IIconButtonProps extends ComponentPropsWithoutRef<'button'> {
  color?: 'inherit' | 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'
  size: 'small' | 'medium' | 'large'
}

export const IconButtonAnimate = forwardRef<HTMLButtonElement, PropsWithChildren<IIconButtonProps & IconButtonProps>>(
  ({ children, size = 'medium', ...other }, ref) => (
    <AnimateWrap size={size} sx={other.sx}>
      <IconButton size={size} ref={ref} {...other}>
        {children}
      </IconButton>
    </AnimateWrap>
  )
)
IconButtonAnimate.displayName = 'IconButtonAnimate'

const varSmall = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 }
}

const varMedium = {
  hover: { scale: 1.09 },
  tap: { scale: 0.97 }
}

const varLarge = {
  hover: { scale: 1.08 },
  tap: { scale: 0.99 }
}

interface IAnimateWrap {
  size: 'small' | 'medium' | 'large'
  sx: SxProps<Theme> | undefined
}

function AnimateWrap({ size, sx, children }: PropsWithChildren<IAnimateWrap>) {
  const isSmall = size === 'small'
  const isLarge = size === 'large'

  return (
    <Box
      component={m.div}
      whileTap="tap"
      whileHover="hover"
      variants={(isSmall && varSmall) || (isLarge && varLarge) || varMedium}
      sx={{
        display: 'inline-flex',
        ...sx
      }}
    >
      {children}
    </Box>
  )
}
