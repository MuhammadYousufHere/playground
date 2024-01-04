import { FunctionComponent } from 'react'
import { Typography } from './Typography'
import useMenu from '@/features/Menu/useMenu'

interface SideBarHeaderProps {
  readonly children: string
  isCollapse: boolean
}

export const SideBarHeader: FunctionComponent<SideBarHeaderProps> = ({ isCollapse, children }) => {
  const { collapseHover } = useMenu()
  return (
    <Typography
      variant="caption"
      color="para"
      fontWeight={500}
      fontFamily="Poppins"
      sx={{
        opacity: !isCollapse ? 1 : collapseHover ? 1 : 0
      }}
    >
      {children}
    </Typography>
  )
}
