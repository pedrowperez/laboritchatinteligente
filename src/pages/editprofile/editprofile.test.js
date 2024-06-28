import { render, screen, fireEvent } from '@testing-library/react';
import EditProfile from '.';

test('renders input fields with correct values', () => {
  const profileData = {
    fullName: 'John Doe',
    email: 'johndoe@example.com',
  };

  render(<EditProfile profileData={profileData} />);

  const fullNameInput = screen.getByPlaceholderText('Full Name');
  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password');

  expect(fullNameInput.value).toBe(profileData.fullName);
  expect(emailInput.value).toBe(profileData.email);
  expect(passwordInput.value).toBe('');

  fireEvent.change(fullNameInput, { target: { value: 'Jane Doe' } });
  fireEvent.change(emailInput, { target: { value: 'janedoe@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  expect(fullNameInput.value).toBe('Jane Doe');
  expect(emailInput.value).toBe('janedoe@example.com');
  expect(passwordInput.value).toBe('password123');
});