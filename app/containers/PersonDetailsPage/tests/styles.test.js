import styles from '../styles';

describe('person details page styles', () => {
  it('should return styles correctly', () => {
    expect(styles()).toEqual({
      tableWrapper: {
        overflowX: 'auto',
      },
      table: {
        minWidth: 400,
      },
      cell: {
        padding: 0,
        paddingLeft: 5,
        paddingRight: 5,
      },
      visitsTitle: {
        marginTop: 30,
        display: 'inline-block',
        lineHeight: '1.5em',
        fontSize: 20,
        fontWeight: 800,
        paddingRight: 15,
      },
      col: {
        display: 'inline-block',
      },
      row: {
        display: 'block',
      },
      dialogContent: {
        overflowX: 'hidden',
      },
    });
  });
});
