import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders 808s & COLD TAKES app', () => {
  render(<App />);
  const logoElement = screen.getByAltText(/808s & COLD TAKES Logo/i);
  expect(logoElement).toBeInTheDocument();
});

test('renders enter button', () => {
  render(<App />);
  const enterButton = screen.getByText(/ENTER/i);
  expect(enterButton).toBeInTheDocument();
});
