import { render, screen } from '@testing-library/react';
import ResilienceSubstitut, { setClassModifier, setClassName } from '../ResilienceSubstitut';

describe('<ResilienceSubstitut/>', () => {
  const defaultProps = {
    anomaly: {
      label: 'label',
      detail: 'detail',
    },
  };

  it('Render <ResilienceSubstitut/> with default props and return Alert resilience', () => {
    const { container } = render(<ResilienceSubstitut {...defaultProps} />);
    expect(screen.getByText('label')).toBeDefined();
    expect(screen.getByText('detail')).toBeDefined();
    expect(container.querySelector('.glyphicon-exclamation-sign')).toBeDefined();
  });

  it('Render <ResilienceSubstitut/> with default props and refetchMock', () => {
    const refetchMock = vi.fn();
    const { container } = render(<ResilienceSubstitut {...defaultProps} refetch={refetchMock} />);
    expect(screen.getByText('Réessayer')).toBeDefined();
    expect(container.querySelector('.af-alert--with-action')).toBeDefined();
    expect(container.querySelector('.af-restitution--with-action')).toBeDefined();
    expect(container.querySelector('.af-btn--hasiconRight')).toBeDefined();
  });

  it('Render <ResilienceSubstitut/> with classModifier="simple" and return Alert resilience with simple classModifier', () => {
    const customProps = { ...defaultProps, classModifier: 'simple', anomaly: { ...defaultProps.anomaly, iconName: 'icon2', type: 'warning' } };
    const { container } = render(<ResilienceSubstitut {...customProps} />);
    expect(screen.getByText('label')).toBeDefined();
    expect(screen.getByText('detail')).toBeDefined();
    expect(container.querySelector('.af-alert--simple')).toBeDefined();
    expect(container.querySelector('.glyphicon-icon2')).toBeDefined();
  });

  it('Render <ResilienceSubstitut/> with resilienceMode="none" and return {}', () => {
    const { container } = render(<ResilienceSubstitut {...defaultProps} resilienceMode="none" />);
    expect(container.firstChild).toBeNull();
  });

  it('Render <ResilienceSubstitut/> with resilienceMode="fallback" and FallBackComponent = Custom and Should contain Custom element', () => {
    const Custom = () => <div>FallbackComponent</div>;
    render(<ResilienceSubstitut {...defaultProps} resilienceMode="fallback" FallbackComponent={Custom} />);
    expect(screen.getByText('FallbackComponent')).toBeDefined();
  });
});

describe('setClassModifier', () => {
  it('Should return "error" when setClassModifier called type="error" and classModifier=""', () => {
    const result = setClassModifier({ type: 'error', classModifier: '' });
    const expected = 'error';
    expect(result).toEqual(expected);
  });
  it('Should return "error" when setClassModifier called type="error" and classModifier=undefined', () => {
    const result = setClassModifier({ type: 'error' });
    const expected = 'error';
    expect(result).toEqual(expected);
  });

  it('Should return "error mymodifier" when setClassModifier called type="error" and classModifier="mymodifier"', () => {
    const result = setClassModifier({ type: 'error', classModifier: 'mymodifier' });
    const expected = 'error mymodifier';
    expect(result).toEqual(expected);
  });
});

describe('setClassName', () => {
  it('Should return "af-alert" when setClassName called with newClassModifier=""', () => {
    const result = setClassName({ newClassModifier: '' });
    expect(result).toEqual('af-alert');
  });

  it('Should return "container af-alert" when setClassName called with newClassModifier="container"', () => {
    const result = setClassName({ newClassModifier: 'container' });
    const expected = 'container af-alert';
    expect(result).toEqual(expected);
  });
});
