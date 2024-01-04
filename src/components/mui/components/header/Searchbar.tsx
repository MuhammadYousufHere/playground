import React, { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import { Input, Slide, InputAdornment, ClickAwayListener } from '@mui/material'
import { FiSearch } from 'react-icons/fi'
import { IconButtonAnimate } from '../animate'
import { Button } from '..'
import { cssStyles } from '@/styles'
import { HEADER } from '@/config'

const SearchbarStyle = styled('div')(({ theme }) => ({
  ...cssStyles(theme).bgBlur({ opacity: 0.8 }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER.MOBILE_HEIGHT,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
    padding: theme.spacing(0, 5)
  }
}))
export default function Searchbar() {
  const theme = useTheme()
  const [isOpen, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(prev => !prev)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <IconButtonAnimate size="medium" onClick={() => handleOpen()}>
            <FiSearch style={{ color: theme.colors.baseBlue, width: 20, height: 20 }} />
          </IconButtonAnimate>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <Input
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search . . ."
              startAdornment={
                <InputAdornment position="start">
                  <FiSearch style={{ color: theme.colors.baseBlue, width: 17.5, height: 17.5 }} />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightSemiBold' }}
            />
            <Button as="common" onClick={handleClose} sx={{ maxWidth: '80px', py: 1 }}>
              Search
            </Button>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  )
}
