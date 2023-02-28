import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokemon } from '../components';

describe('Teste o componente <Pokemon.js />', () => {
  const pokemon = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  };

  test(' é renderizado um card com as informações de determinado Pokémon:', () => {
    const isFavorite = false;

    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ isFavorite }
    />);

    const pokName = screen.getByText(/pikachu/i);
    const pokType = screen.getByText(/Electric/i);
    const pokAvgWe = screen.getByText('Average weight: 6.0 kg');
    const pokImg = screen.getByRole('img');
    const imgUrl = 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png';

    expect(pokName).toBeInTheDocument();
    expect(pokType).toBeInTheDocument();
    expect(pokAvgWe).toBeInTheDocument();
    expect(pokImg).toBeInTheDocument();
    expect(pokImg.src).toBe(imgUrl);
    expect(pokImg.alt).toBe('Pikachu sprite');
  });

  test('o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon.', () => {
    const isFavorite = false;

    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ isFavorite }
    />);

    const pokLink = screen.getByRole('link', { name: 'More details' });
    expect(pokLink).toBeInTheDocument();
    expect(pokLink.href).toBe('http://localhost/pokemon/25');
  });

  test('ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const isFavorite = false;

    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ isFavorite }
    />);

    const pokLink = screen.getByRole('link', { name: /more details/i });
    expect(pokLink).toBeInTheDocument();

    userEvent.click(pokLink);

    expect(history.location.pathname).toBe('/pokemon/25');
  });

  test('existe um ícone de estrela nos Pokémon favoritados', () => {
    const isFavorite = true;

    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ isFavorite }
    />);
    // screen.logTestingPlaygroundURL();
    const pokStar = screen.getByRole('img', { name: /pikachu is marked as favorite/i });

    expect(pokStar).toBeInTheDocument();
    expect(pokStar.src).toBe('http://localhost/star-icon.svg');
    expect(pokStar.alt).toBe('Pikachu is marked as favorite');
  });
});
