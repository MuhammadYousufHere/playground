import { alpha, type PaletteMode } from '@mui/material'

export const toolbarStyles = (mode: PaletteMode) => ({
  container: { justifyContent: 'space-between', px: 2 },
  box: { display: 'flex', mt: 1 },
  iconButton: {
    background: mode === 'light' ? '#c8d8fa' : '#262626',
    mr: 1.2,
    '&:disabled': {
      background: mode === 'light' ? '#eaecee' : '#1f2328',
      ...(mode === 'dark' && { color: alpha('#c8d8fa', 0.25) })
    },
    '&:focus': {
      boxShadow:
        ' #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 1px 2px, rgba(45, 35, 66, 0.3) 0 4px 3px -3px, #D6D6E7 0 -3px 0 inset'
    },
    '&:hover': {
      background: '#c8d8fa',
      boxShadow: '#c8d8fa0 4px 3px, #c8d8fa 0 4px 3px -3px, #D6D6E7 0 -3px 0 inset',
      transform: 'translateY(-1px)'
    },
    '&:active': {
      boxShadow: '#D6D6E7 0 3px 7px inset',
      transform: 'translateY(1px)'
    }
  },
  actionBox: { display: 'flex', gap: '5px' },
  active: '#5b71dd', // icon
  inactive: '#bdbdbd' // icon
})
export const tableStlyes = (mode: string) => ({
  boxShadow: 2,
  border: '1px solid #e0e0e0',
  borderRadius: '15px',
  fontFamily: 'Poppins',
  backgroundColor: 'background.paper',
  ...(mode === 'dark' && { borderColor: '#2d3748', background: '#161C24' }),
  my: 2,
  '& .MuiDataGrid-columnHeader:focus': {
    outline: 'unset'
  },
  '& .MuiDataGrid-cell:focus': {
    outline: 'unset'
  },
  '& .MuiDataGrid-columnSeparator--sideRight': {
    display: 'none'
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: mode === 'light' ? '#f0f9ff' : '#919eab14'
  },
  '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
    width: '0.5em',
    height: '0.5em'
  },
  '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
    background: '#eaecee'
  },
  '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '10px'
  },
  '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover': {
    background: '#555'
  },
  '& .MuiDataGrid-columnHeaderCheckbox': {
    visibility: 'hidden'
  },
  overflow: 'hidden',
  // change checkbox color
  '& .MuiDataGrid-cellCheckbox': {
    outline: 'none',
    '& .MuiButtonBase-root': {
      color: '#5b71dd !important',
      '& svg': {
        width: '0.8em',
        height: '0.8em'
      }
    }
  },
  '& .MuiDataGrid-row': {
    cursor: 'pointer'
  }
})
