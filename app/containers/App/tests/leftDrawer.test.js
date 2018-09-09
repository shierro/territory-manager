import leftDrawer from '../leftDrawer';

describe('container/App/leftDrawer.js', () => {
  it('should render left drawer successfully', () => {
    const props = {
      drawerOpen: true,
      toggleDrawer: true,
      token: 'token!',
      history: { empty: true },
      logout: true,
      location: { pathname: '/' },
    };
    const { props: drawerProps } = leftDrawer(props);
    expect(drawerProps.open).toEqual(props.drawerOpen);
    expect(drawerProps.hidden).toEqual(false);
    expect(drawerProps.history).toEqual(props.history);
    expect(drawerProps.logout).toEqual(props.logout);
    expect(drawerProps.path).toEqual(props.location.pathname);
  });
});
