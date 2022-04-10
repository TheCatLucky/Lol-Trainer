import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';
import { BrowserRouter } from 'react-router-dom';

test('renders learn react link', () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>,
  );
  const authorName = screen.getByText(/савицкий евгений/i);

  expect(authorName).toBeInTheDocument();
});
