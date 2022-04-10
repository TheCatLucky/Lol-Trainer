import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../Header';
import { BrowserRouter } from 'react-router-dom';

const renderComponent = (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);
describe('Компонент Header', () => {
  it('отображает все ссылки', () => {
    render(renderComponent);
    
    const title = screen.getByText(/lol trainer/i);
    const firstLink = screen.getByText(/статистики персонажей/i);
    const secondLink = screen.getByText(/статистики предметов/i);
    const thirdLink = screen.getByText(/form field/i);

    expect(title).toBeInTheDocument();
    expect(firstLink).toBeInTheDocument();
    expect(secondLink).toBeInTheDocument();
    expect(thirdLink).toBeInTheDocument();
  });
  it('при клике на ссылку меняет URL', async () => {
    render(renderComponent);

    const firstLink = screen.getByText(/статистики персонажей/i);
    await userEvent.click(firstLink);
    expect(window.location.pathname).toEqual('/champStats');

    const secondLink = screen.getByText(/статистики предметов/i);
    await userEvent.click(secondLink);
    expect(window.location.pathname).toEqual('/itesmStats');

    const thirdLink = screen.getByText(/form field/i);
    await userEvent.click(thirdLink);
    expect(window.location.pathname).toEqual('/formField');
  });
});
