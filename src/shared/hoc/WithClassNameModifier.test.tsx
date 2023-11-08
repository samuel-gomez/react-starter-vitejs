import { render, screen } from '@testing-library/react';
import withClassNameModifier from './WithClassNameModifier';

const ExampleComponent = ({ className }: { className?: string }) => (
  <div role="alert" className={className}>
    Hello
  </div>
);

describe('WithClassNameModifier', () => {
  const EnhancedComponent = withClassNameModifier(ExampleComponent);

  it('Should render Custom Component with new className props null modifier when apply HOC with className null modifier', () => {
    render(<EnhancedComponent className="af-component" />);
    const skeleton = screen.getByRole('alert');
    expect(skeleton).toHaveClass('af-component');
  });

  it('Should render Custom Component with new className props when apply HOC with className', () => {
    render(<EnhancedComponent className="af-component" classModifier="sam" />);
    const skeleton = screen.getByRole('alert');
    expect(skeleton).toHaveClass('af-component');
    expect(skeleton).toHaveClass('af-component--sam');
  });

  it('Should render Custom Component with new className props with 2 modifiers when apply HOC with className with 2 modifiers', () => {
    render(<EnhancedComponent className="af-component" classModifier="sam sam2" />);
    const skeleton = screen.getByRole('alert');
    expect(skeleton).toHaveClass('af-component');
    expect(skeleton).toHaveClass('af-component--sam');
    expect(skeleton).toHaveClass('af-component--sam2');
  });

  it('Should render Custom Component without className props when apply HOC with className undefined modifier', () => {
    render(<EnhancedComponent />);
    const skeleton = screen.getByRole('alert');
    expect(skeleton).toHaveAttribute('class', '');
  });
});
