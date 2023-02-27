import { screen } from '@testing-library/react';
import React from 'react';
import { About } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <About.js />', () => {
  test('A página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutHeadingH2 = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(aboutHeadingH2).toBeInTheDocument();
  });

  test('a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    // screen.logTestingPlaygroundURL();
    const p1 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    const p2 = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');

    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  test('A página contém uma imagem de uma Pokédex especifica', () => {
    renderWithRouter(<About />);

    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');

    expect(img.src).toBe(imgUrl);
  });
});
