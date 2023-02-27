import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe(' Teste o componente <App.js />', () => {
  test('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémon' });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  test('A aplicação é redirecionada para a página inicial, ao clicar no link Home ', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  test('A aplicação é redirecionada para a página de About ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  test('A aplicação é redirecionada para a página de Pokémon Favoritados ao clicar no link Favorite Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(favoriteLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('A aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/urlinvalida');
    });

    const errorMsg = screen.getByRole('heading', { name: 'Page requested not found', level: 2 });
    expect(errorMsg).toBeVisible();
  });
});
