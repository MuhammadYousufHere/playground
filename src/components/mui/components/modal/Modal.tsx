import { useEffect, type PropsWithChildren } from 'react'
import { Box, Container, Stack, Dialog as MuiDialog, styled } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Border } from '../table'
import { FacebookCircularProgress } from '../Loader'
import { Button, Typography } from '..'

export const Dialog = styled(MuiDialog)`
  & .MuiPaper-root {
    border-radius: 10px;
  }
`

const HorizontalLine = styled(Box)`
  background-color: #f5f6f7;
  height: 1px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 1px 1px;
`

// background-color: #1c1c1e; for dark theme

interface IModal {
  open: boolean
  onClose: () => void
  isLoading?: boolean
  buttonLabel?: string
  disabled?: boolean
  title: string
  onClick: () => void
}
export default function Modal({
  open,
  onClose,
  onClick,
  title,
  buttonLabel = 'Create',
  disabled,
  isLoading,
  children
}: PropsWithChildren<IModal>) {
  const theme = useTheme()
  const isLight = theme.palette.mode === 'light'
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])
  // #282a3633 overlay
  return (
    <Dialog
      aria-labelledby="modal-title"
      onClose={onClose}
      open={open}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: isLight ? '#ffffff' : '#0A0A0A',
          border: '1px solid',
          borderColor: isLight ? '#7a7a7a' : '#2d3748',
          width: { xs: 380, sm: 500, lg: 600 },
          overflow: 'hidden'
        }
      }}
    >
      <Border placement="top" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 1
        }}
      >
        <Typography
          variant="h5"
          id="modal-title"
          sx={{
            textAlign: 'center',
            ...(isLight && { color: '#0b214a' }),
            p: 2,
            fontFamily: 'Poppins',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            borderRadius: '0 0 15px 15px'
          }}
        >
          {title}
        </Typography>
        <Container
          sx={{
            p: 2,
            maxHeight: '500px',
            overflowY: 'auto',
            flex: 1,
            '&::-webkit-scrollbar': {
              width: '0.6em',
              height: '0.6em'
            },
            '&::-webkit-scrollbar-track': {
              background: '#eaecee'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#c7cfd9',
              borderRadius: '10px'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#8f99a6'
            }
          }}
        >
          {children}
        </Container>
        <>
          <HorizontalLine />
          <Stack
            sx={{
              alignItems: 'center',
              columnGap: 2,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              px: 2,
              pb: 2
            }}
          >
            <Button as="border" variant="outlined" width="compact" onClick={onClose}>
              Cancel
            </Button>
            <Button
              width="compact"
              as="common"
              onClick={onClick}
              disabled={disabled}
              sx={{
                textAlign: 'center',
                background: 'linear-gradient(101.63deg,#28a1c0 8.53%,#16489c 107.27%)',
                transition: 'opacity',
                '&:hover': {
                  opacity: '.9',
                  transition: 'opacity .4s'
                }
              }}
            >
              {isLoading ? <FacebookCircularProgress /> : buttonLabel}
            </Button>
          </Stack>
        </>
      </Box>
    </Dialog>
  )
}
