import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import DebouncedInput from './DebouncedInput';

describe('DebouncedInput', () => {
  it('should not render debounced value until after delay', async () => {
    const user = userEvent.setup();
    render(<DebouncedInput />);

    const input = screen.getByRole('textbox');

    // Type into the input
    await user.type(input, 'pikachu');

    // Immediately after typing, the debounced value should still be empty
    expect(screen.getByText('Debounced value:')).toBeInTheDocument();
    expect(screen.queryByText('Debounced value: pikachu')).not.toBeInTheDocument();

    // After the debounce delay (1000ms), the debounced value should be updated
    await waitFor(
      () => {
        expect(screen.getByText('Debounced value: pikachu')).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
  });
});
