import { onChangeValue } from '../form.helper';

describe('onChangeValue', () => {
  test('Should call onChange with target value', () => {
    const onChange = vi.fn();
    onChangeValue(onChange)({ value: 'test' });
    expect(onChange).toHaveBeenCalledWith('test');
  });
});
