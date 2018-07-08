import styles from '../styles';

describe('map page styles', () => {
  it('should return styles correctly', () => {
    expect(styles({ palette: { primary: {} } })).toEqual({
      reCenterButton: {
        bottom: 0,
        color: undefined,
        position: 'absolute',
        zIndex: 10000,
      },
    });
  });
});
