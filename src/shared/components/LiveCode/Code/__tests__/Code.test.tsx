import { render } from '@testing-library/react';
import { themes } from 'prism-react-renderer/dist/index';
import { describe, expect, it } from 'vitest';
import Code from '../Code';

describe('<Code />', () => {
  it('Render <Code /> with theme, code', () => {
    const { asFragment } = render(<Code theme={themes.vsDark} code="test" />);

    expect(asFragment()).toMatchSnapshot();
  });
});
