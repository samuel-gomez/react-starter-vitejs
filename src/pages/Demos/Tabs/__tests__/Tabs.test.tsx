import { onChangeTabFn } from '../Tabs';

describe('onChangeTabFn', () => {
  it('Should called onChangeFn', () => {
    const onChangeFn = vi.fn().mockImplementation(() => () => ({}));
    onChangeTabFn('active', onChangeFn)('test');
    expect(onChangeFn).toBeCalledWith('active');
  });
});
