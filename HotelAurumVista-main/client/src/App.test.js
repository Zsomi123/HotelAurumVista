import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hotel name', () => {
  render(<App />);
  const hotelElement = screen.getByText(/Hotel Aurum Vista/i);
  expect(hotelElement).toBeInTheDocument();
});
