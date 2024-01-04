import { Box, type BoxProps } from '@mui/material'
interface IProps extends BoxProps {
  placement: 'top' | 'bottom'
}
export const Border = ({ placement, sx, ...rest }: IProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '6px',
        background: 'linear-gradient(to right, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #41dfff, #46eefa, #5ffbf1)',
        position: 'absolute',
        ...(placement === 'bottom' && { bottom: 0 }),
        ...(placement === 'top' && { top: 0 }),
        left: '0',
        ...sx
      }}
      {...rest}
    />
  )
}
