import renderHeader from '../header';

describe('container/App/header.js', () => {
  it('should render header successfully', () => {
    const rendered = renderHeader(true, 123, () => true);
    expect(rendered.props.open).toEqual(true);
    expect(rendered.props.token).toEqual(123);
  });
});
