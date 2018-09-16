import styles from '../styles';

describe('map page styles', () => {
  it('should return styles correctly', () => {
    expect(styles({ palette: { error: { main: 'red' } } })).toEqual({
      container: {
        margin: '0 auto',
        marginTop: 40,
        maxWidth: 550,
        padding: 20,
      },
      error: {
        backgroundColor: 'red',
        padding: '10px 15px',
      },
      footer: {
        padding: '20px 0',
      },
    });
  });
});
