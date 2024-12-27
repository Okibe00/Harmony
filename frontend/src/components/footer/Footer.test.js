import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('should contain footer', () => {
  render(<Footer />);
  const elem = screen.getByText('Okibe Onmeje 2024', { exact: false });
  expect(elem).toBeInTheDocument();
});
