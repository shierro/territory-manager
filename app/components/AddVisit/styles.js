const styles = theme => ({
  container: {
    textAlign: 'center',
  },
  column: {
    display: 'inline-block',
    width: '50%',
    textAlign: 'left',
  },
  selected: {
    border: `2px solid ${theme.palette.secondary.main} !important`,
  },
  badge: {
    top: 1,
    right: -20,
    marginLeft: 10,
    border: `2px solid ${theme.palette.grey[200]}`,
  },
});

export default styles;
