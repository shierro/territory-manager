const styles = theme => ({
  reCenterButton: {
    position: 'fixed',
    zIndex: 10000,
    bottom: 0,
    color: theme.palette.primary.dark,
  },
  addPersonButton: {
    color: theme.palette.primary.dark,
    position: 'fixed',
    zIndex: 10000,
    bottom: 10,
    right: 10,
  },
  popupContainer: {
    textAlign: 'center',
  },
  detailsButton: {
    marginTop: 20,
  },
});

export default styles;
