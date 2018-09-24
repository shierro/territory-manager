import styles from '../styles';

describe('PlacementsPage styles', () => {
  it('should return styles correctly', () => {
    expect(styles()).toEqual({
      title: {
        padding: '10px 15px',
        paddingBottom: 0,
      },
      container: {
        minHeight: 'calc(100vh - 120px)',
      },
      content: {
        padding: 15,
      },
    });
  });
});
