import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from '../App';

it('renders learn react link', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const linkElement = screen.getByText(/савицкий/i);
  expect(linkElement).toBeInTheDocument();
});
