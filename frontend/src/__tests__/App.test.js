import { render, screen } from '@testing-library/react';
import App from '../App.js';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
    const title = screen.getByText("SHORT.IT");
    expect(title).toBeInTheDocument();
  });
  test('renders image', () => {
    render(<App />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
  });
});