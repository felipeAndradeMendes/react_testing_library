import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { PokemonDetails } from '../pages';
import pokemonList from '../data';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  // const pokemon = {
  //   id: 25,
  //   name: 'Pikachu',
  //   type: 'Electric',
  //   averageWeight: {
  //     value: '6.0',
  //     measurementUnit: 'kg',
  //   },
  //   image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
  //   moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  //   foundAt: [
  //     {
  //       location: 'Kanto Viridian Forest',
  //       map: 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
  //     },
  //     {
  //       location: 'Kanto Power Plant',
  //       map: 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
  //     },
  //   ],
  //   summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  // };

  const pokPath = '/pokemon/:id';
  const pokUrl = '/pokemon/25';

  test('As informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
    const ispokFavorite = {
      4: false,
      10: false,
      23: false,
      25: true,
      65: false,
      78: false,
      143: false,
      148: false,
      151: false,
    };
    // const onUpFavorite = false;

    // const onUpdateFavoritePokemon = (pokemonId, isFavorite) => {
    //   updateFavoritePokemon(pokemonId, isFavorite);

    //   this.setState(({ isPokemonFavoriteById: this.setIsPokemonFavoriteById() }));
    // };

    const matchPok = {
      isExact: true,
      params: {
        id: '25',
      },
      path: pokPath,
      url: pokUrl,
    };

    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ ispokFavorite }
      pokemonList={ pokemonList }
      onUpdateFavoritePokemon={
        (pokemonId, checked) => this.onUpdateFavoritePokemon(pokemonId, checked)
      }
      match={ matchPok }
    />);

    const titleDetails = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });
    expect(titleDetails).toBeInTheDocument();

    const detailsLink = screen.queryByRole('link', { name: 'More details' });
    expect(detailsLink).not.toBeInTheDocument();

    const headingSummary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(headingSummary).toBeInTheDocument();

    const paragraph = screen.getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i);
    expect(paragraph).toBeInTheDocument();
  });

  test('existe na página uma seção com os mapas contendo as localizações do Pokémon:', () => {
    const ispokFavorite = {
      4: false,
      10: false,
      23: false,
      25: true,
      65: false,
      78: false,
      143: false,
      148: false,
      151: false,
    };
    const matchPok = {
      isExact: true,
      params: {
        id: '25',
      },
      path: pokPath,
      url: pokUrl,
    };

    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ ispokFavorite }
      pokemonList={ pokemonList }
      onUpdateFavoritePokemon={
        (pokemonId, checked) => this.onUpdateFavoritePokemon(pokemonId, checked)
      }
      match={ matchPok }
    />);

    const headingGame = screen.getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 });
    expect(headingGame).toBeInTheDocument();

    const pokMap1 = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(pokMap1[0]).toBeInTheDocument();
    expect(pokMap1[1]).toBeInTheDocument();

    expect(pokMap1[0].src).toBe('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(pokMap1[1].src).toBe('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('o usuário pode favoritar um Pokémon através da página de detalhes:', () => {
    const ispokFavorite = {
      4: false,
      10: false,
      23: false,
      25: true,
      65: false,
      78: false,
      143: false,
      148: false,
      151: false,
    };
    const matchPok = {
      isExact: true,
      params: {
        id: '25',
      },
      path: pokPath,
      url: pokUrl,
    };

    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ ispokFavorite }
      pokemonList={ pokemonList }
      match={ matchPok }
    />);

    const pokFav = screen.getByLabelText('Pokémon favoritado?');
    expect(pokFav).toBeInTheDocument();

    const checkFav = screen.getByRole('checkbox');
    expect(checkFav).toBeInTheDocument();
    expect(checkFav).toBeChecked();
  });

  test('Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const checkFav = screen.getByRole('checkbox');
    expect(checkFav).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
    expect(checkFav).not.toBeChecked();

    userEvent.click(checkFav);
    expect(checkFav).toBeChecked();
  });
});
