import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SkeletonInputField from '..';

describe('<SkeletonInputField/>', () => {
  it('Render <SkeletonInputField/>', () => {
    const { asFragment } = render(<SkeletonInputField label="hello" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
