import { describe, it, expect } from 'vitest';
import { render, screen, userEvent } from 'shared/testsUtils';
import Home from '../Home';

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<Home />);
    expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();
  });

  it('should increment count on click', async () => {
    render(<Home />);
    const button = await screen.findByRole('button', {
      name: /count is 0/,
    });
    userEvent.click(button);
    expect(await screen.findByText(/count is 1/i)).toBeInTheDocument();
  });
});
