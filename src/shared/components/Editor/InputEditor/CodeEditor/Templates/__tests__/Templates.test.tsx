import { render } from '@testing-library/react';
import Templates from '..';

const defaultProps = {
  submitTemplate: vi.fn(),
  onClearCodeEditor: vi.fn(),
};

describe('<Templates/>', () => {
  it('Should render Templates', () => {
    const { asFragment } = render(<Templates {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
