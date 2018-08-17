const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  ageRangeContainer: {
    width: '100%',
  },
  visitContainer: {
    width: '100%',
  },
  visitLabel: {
    margin: 0,
    marginTop: 20,
  },
  editSwitchLabel: {
    marginLeft: 0,
  },
  inputContainer: {
    paddingBottom: 10,
  },
  column: {
    display: 'inline-block',
    width: '50%',
  },
  badge: {
    top: 1,
    right: -20,
    marginLeft: 10,
    // The border color match the background color.
    border: `2px solid ${theme.palette.grey[900]}`,
  },
});

export default styles;
