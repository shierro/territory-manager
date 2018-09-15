const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    height: 60,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: '100%',
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    // marginRight: 12,
  },
  hide: {
    display: 'none',
  },
  title: {
    marginLeft: 12,
    maxHeight: 64,
    '&:link, &:visited': {
      textDecoration: 'none',
      color: 'inherit',
      cursor: 'pointer',
    },
  },
  logoContainer: {
    height: 35,
    width: 35,
    marginBottom: 3,
    marginRight: 10,
    lineHeight: '30px',
    verticalAlign: 'baseline',
  },
  appName: {
    fontWeight: 800,
    fontSize: 24,
    display: 'block',
    maxHeight: 20,
  },
  appNameContainer: {
    display: 'inline-block',
    lineHeight: '20px',
  },
});

export default styles;
