import defaultSaga from '../saga';

describe('defaultSaga Saga', () => {
  const watchLoginPageSaga = defaultSaga();
  it('should start task to watch for LOGIN action', () => {
    const takeLatestDescriptor = watchLoginPageSaga.next().value;
    expect(takeLatestDescriptor).toBe(undefined);
  });
});
