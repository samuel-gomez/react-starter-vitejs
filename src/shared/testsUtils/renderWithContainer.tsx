import { render } from '@testing-library/react';
import { type ReactElement } from 'react';

const renderWithContainer = (Component: ReactElement, container: HTMLElement) =>
  render(Component, {
    container: document.body.appendChild(container),
  });

export default renderWithContainer;
