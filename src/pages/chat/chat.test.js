import { render, screen } from '@testing-library/react';
import ChatBot from './ChatBot';

test('renders BrainBox text box', () => {
  render(<ChatBot />);
  const brainBoxTextBox = screen.getByText(/BrainBox/i);
  expect(brainBoxTextBox).toBeInTheDocument();
});