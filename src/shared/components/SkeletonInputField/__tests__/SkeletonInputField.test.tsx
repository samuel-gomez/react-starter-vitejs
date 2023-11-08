import { render, screen } from '@testing-library/react';
import SkeletonInputField from '..';

describe('<SkeletonInputField/>', () => {
  it('Render <SkeletonInputField/>', () => {
    render(<SkeletonInputField label="hello" />);
    const skeleton = screen.getByRole('alert');
    expect(skeleton).toHaveAccessibleName();
    expect(skeleton).toHaveClass('af-skeleton');
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
