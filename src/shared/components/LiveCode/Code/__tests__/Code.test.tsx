import { render } from '@testing-library/react';
import type { PrismTheme } from 'prism-react-renderer';
import { themes } from 'prism-react-renderer/dist/index';
import Code from '../Code';

describe('<Code />', () => {
  it('Render <Code /> with theme, code', () => {
    const { asFragment } = render(<Code theme={themes.vsDark as PrismTheme} code="test" />);

    expect(asFragment()).toMatchSnapshot();
  });
});
