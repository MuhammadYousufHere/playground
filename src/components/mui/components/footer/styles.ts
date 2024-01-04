export const styles = {
  footer: {
    position: 'sticky',
    bottom: '0',
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  },
  link: {
    fontSize: '0.76rem',
    '&:not(:first-of-type)': {
      paddingLeft: 1
    },

    '&[disabled]': {
      '&:hover': {
        textDecoration: 'none'
      }
    }
  }
}
