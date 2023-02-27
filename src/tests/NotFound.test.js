import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  test('A página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const notFoundText = screen.getByRole('heading', { name: 'Page requested not found', level: 2 });
    expect(notFoundText).toBeInTheDocument();
  });

  test(' A página mostra uma imagem especifica', () => {
    renderWithRouter(<NotFound />);

    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByRole('img');
    expect(img.src).toBe(imgUrl);
  });
});
