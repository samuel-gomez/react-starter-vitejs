import { render, screen } from '@testing-library/react';
import Resilience from '../Resilience';

describe('Resilience', () => {
  const CustomComponent = () => <div>No anomaly</div>;

  const resilienceProps = {
    classModifier: '',
  };

  it('Should render null when Resilience have been called with no anomaly and no child', () => {
    const EnhancedComponent = () => (
      <Resilience {...resilienceProps}>
        <p>my content</p>
      </Resilience>
    );
    render(<EnhancedComponent />);
    expect(screen.getByText('my content')).toBeInTheDocument();
  });

  it('Should render child Component when Resilience have been called with no anomaly and child', () => {
    const EnhancedComponent = () => (
      <Resilience {...resilienceProps}>
        <CustomComponent />
      </Resilience>
    );
    render(<EnhancedComponent />);
    expect(screen.getByText('No anomaly')).toBeDefined();
  });

  it('Should render FallbackComponent when Resilience have been called with anomaly and FallbackComponent', () => {
    const ErrorComponent = () => <div>There is an error</div>;
    const anomaly = {
      label: 'error label',
    };

    const EnhancedComponent = () => (
      <Resilience {...resilienceProps} resilienceMode="fallback" FallbackComponent={ErrorComponent} anomaly={anomaly}>
        <CustomComponent />
      </Resilience>
    );
    render(<EnhancedComponent />);
    expect(screen.getByText('There is an error')).toBeDefined();
  });
});
