import React, { useRef, useState } from 'react'
import { MenuItem, Stack } from '@mui/material'
import { Image } from '../Image'
import MenuPopover from '../MenuPopover'
import { IconButtonAnimate } from '../animate'
import { useLocales } from '@/hooks'

export default function LanguageSwitch() {
  const { allLang, currentLang, handleChangeLanguage } = useLocales()
  const ref = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <IconButtonAnimate
        size="medium"
        onClick={handleOpen}
        ref={ref}
        sx={{
          width: 40,
          height: 40,
          ...(open && { bgcolor: 'action.selected' })
        }}
      >
        <Image src={currentLang.icon} alt={currentLang.label} />
      </IconButtonAnimate>

      <MenuPopover
        open={open}
        onClose={handleClose}
        disabledArrow={false}
        arrow={'top-right'}
        anchorEl={ref.current}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 180,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 }
        }}
      >
        <Stack spacing={0.75}>
          {allLang.map(option => (
            <MenuItem
              key={option.value}
              selected={option.value === currentLang.value}
              onClick={() => {
                handleChangeLanguage(option.value)
                handleClose()
              }}
            >
              <Image disabledEffect alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  )
}
