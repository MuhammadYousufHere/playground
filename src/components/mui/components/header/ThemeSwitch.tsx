import React from 'react'
import { BsFillSunFill, BsMoonStars } from 'react-icons/bs'
import { useTheme } from '@mui/material/styles'
import { IconButtonAnimate } from '../animate'
import { useSetting } from '@/features/Setting'

export default function ThemeSwitch() {
  const theme = useTheme()
  const { mode, toggleTheme } = useSetting()
  const Icon = mode === 'light' ? BsFillSunFill : BsMoonStars
  return (
    <IconButtonAnimate size="medium" onClick={() => toggleTheme()}>
      <Icon style={{ color: theme.colors.baseBlue, width: 22, height: 22 }} />
    </IconButtonAnimate>
  )
}
