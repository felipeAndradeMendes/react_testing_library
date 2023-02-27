import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { FavoritePokemon } from '../pages';
import renderWithRouter from './renderWithRouter';
// import { updateFavoritePokemon } from '../services/pokedexService';

// jest.mock('../services/pokedexService');

describe('Teste o componente <FavoritePokemon.js />. Ao favoritar a partir da página de detalhes teste se', () => {
  test('é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
    renderWithRouter(<FavoritePokemon />);

    const favoriteNotFoundMsg = screen.getByText('No favorite Pokémon found');
    expect(favoriteNotFoundMsg).toBeInTheDocument();
  });

  test('Apenas são exibidos os Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const favoriteCheckbox = screen.getByRole('checkbox');
    expect(favoriteCheckbox).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);

    act(() => {
      history.push('/favorites');
    });
    expect(history.location.pathname).toBe('/favorites');
    screen.logTestingPlaygroundURL();

    const pokName = screen.getByTestId('pokemon-name', { name: /pikachu/i });
    const pokNameNotFavorite = screen.queryByText('pokemon-name', { name: /Charmander/i });

    expect(pokName).toBeInTheDocument();
    expect(pokNameNotFavorite).not.toBeInTheDocument();
  });
});
