import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../pages';
import renderWithRouter from './renderWithRouter';
import pokemonList from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  test('a página contém um heading h2 com o texto Encountered Pokémon', () => {
    const pokeFav = { 25: false, 4: true };

    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ pokeFav }
    />);

    const heading1 = screen.getByRole('heading', { name: 'Encountered Pokémon', level: 2 });

    expect(heading1).toBeInTheDocument();
  });

  test('É mostrado apenas um Pokémon por vez', () => {
    const pokeFav = { 25: false, 4: true };

    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ pokeFav }
    />);

    const pok1 = screen.getByTestId('pokemon-name', { name: /pikachu/i });
    expect(pok1).toBeInTheDocument();

    const btn = screen.getByRole('button', { name: 'Próximo Pokémon' });
    userEvent.click(btn);
    screen.logTestingPlaygroundURL();

    const pokNameNotFavorite = screen.queryByText('Charmander');
    expect(pokNameNotFavorite).toBeInTheDocument();

    const pokPrev = screen.queryByText(/pikachu/i);
    expect(pokPrev).not.toBeInTheDocument();
  });

  test('A Pokédex tem os botões de filtro', () => {
    const pokeFav = { 25: false, 4: true };

    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ pokeFav }
    />);
    const testId = 'pokemon-type-button';

    const btnsType = screen.getAllByTestId(testId, { name: /eletric/i });
    screen.logTestingPlaygroundURL();

    const btnFire = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(btnFire);
    const typeFire = screen.getByTestId('pokemon-type');

    expect(typeFire).toHaveTextContent('Fire');

    expect(btnsType).toHaveLength(7);
  });

  test('A Pokédex contém um botão para resetar o filtro', () => {
    const pokeFav = { 25: false, 4: true };

    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ pokeFav }
    />);

    const btnFire = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(btnFire);
    screen.logTestingPlaygroundURL();
    const pokCharmander = screen.getByText(/charmander/i);

    expect(pokCharmander).toBeInTheDocument();

    const btnAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(btnAll);
    const pokPikachu = screen.getByText(/pikachu/i);

    expect(pokPikachu).toBeInTheDocument();
  });
});
