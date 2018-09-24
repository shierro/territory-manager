const transition = theme =>
  theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  });

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 240,
    transition: transition(theme),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: transition(theme),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  liNested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  liRoot: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  liButton: {
    color: theme.palette.secondary.main,
  },
  liDivider: {
    color: theme.palette.secondary.main,
  },
  list: { padding: 0 },
});

export default styles;
