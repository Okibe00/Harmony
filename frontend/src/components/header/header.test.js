import { render, screen } from '@testing-library/react';
import Header from './header';

test('should render a header component with 3 links', () => {
  render(<Header />);
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('About')).toBeInTheDocument();
  expect(screen.getByText('Contact')).toBeInTheDocument();
});

//test for when links are clicked would make sense
