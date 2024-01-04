export const overrides = {
  MuiButton: {
    root: {
      textTransform: 'none'
    }
  },
  MuiFormHelperText: {
    root: {
      lineHeight: 'unset'
    }
  },
  MuiBackdrop: {
    root: {
      backgroundColor: '#4A4A4A1A'
    }
  },
  MuiMenu: {
    paper: {
      boxShadow: '0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A'
    }
  },
  MuiSelect: {
    icon: {
      color: '#B9B9B9'
    }
  },
  MuiListItem: {
    root: {
      '&$selected': {
        backgroundColor: '#F3F5FF !important',
        '&:focus': {
          backgroundColor: '#F3F5FF'
        }
      }
    },
    button: {
      '&:hover, &:focus': {
        backgroundColor: '#F3F5FF'
      }
    }
  },
  MuiTouchRipple: {
    child: {
      backgroundColor: 'white'
    }
  },
  MuiTableRow: {
    root: {
      height: 56
    }
  },
  MuiTableCell: {
    root: {
      borderBottom: '3px solid rgba(224, 224, 224, .5)',
      paddingLeft: 24
    },
    head: {
      fontSize: '1rem'
    },
    body: {
      fontSize: '0.95rem'
    }
  },
  PrivateSwitchBase: {
    root: {
      marginLeft: 10
    }
  }
}
