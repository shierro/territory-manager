import styles from '../styles';

describe('container/App/styles.js', () => {
  it('should render left drawer successfully', () => {
    const theme = {
      mixins: { toolbar: { display: 'block' } },
      palette: { background: { default: 'green' } },
      spacing: { unit: 1 },
    };
    const { toolbar, content } = styles(theme);
    expect(content.backgroundColor).toEqual(theme.palette.background.default);
    expect(toolbar.display).toEqual(theme.mixins.toolbar.display);
    expect(content.padding).toEqual(theme.spacing.unit * 3);
  });
});
