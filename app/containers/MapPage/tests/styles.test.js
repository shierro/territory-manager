import styles from '../styles';

describe('map page styles', () => {
  it('should return styles correctly', () => {
    expect(styles({ palette: { primary: {} } })).toEqual({
      addPersonButton: {
        bottom: 10,
        color: undefined,
        position: 'fixed',
        right: 10,
        zIndex: 10000,
      },
      reCenterButton: {
        bottom: 0,
        color: undefined,
        position: 'fixed',
        zIndex: 10000,
      },
      popupContainer: {
        textAlign: 'center',
      },
      detailsButton: {
        marginTop: 20,
      },
    });
  });
});
