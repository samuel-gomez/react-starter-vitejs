import { render, screen } from '@testing-library/react';
import Skeleton from '../Skeleton';

describe('<Skeleton/>', () => {
  it('Render <Skeleton/> with default className', () => {
    render(<Skeleton />);
    const skeleton = screen.getByRole('alert');
    expect(skeleton).toHaveAccessibleName();
    expect(skeleton).toHaveClass('af-skeleton');
  });

  it('Render <Skeleton/> with other className', () => {
    render(<Skeleton className="other" />);
    const skeleton = screen.getByRole('alert');
    expect(skeleton).toHaveAccessibleName();
    expect(skeleton).toHaveClass('other');
  });

  it('Render <Skeleton/> with other className and custom modifier', () => {
    render(<Skeleton className="other" classModifier="custom" />);
    const skeleton = screen.getByRole('alert');
    expect(skeleton).toHaveAccessibleName();
    expect(skeleton).toHaveClass('other');
    expect(skeleton).toHaveClass('other--custom');
  });
});
