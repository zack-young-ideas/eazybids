/*
Tests to ensure the user can filter assignments.
*/

import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { render, fireEvent, within, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '../pages/index';
import assignments from '../lib/placeholder-data';

const server = setupServer(
  http.get('/api/assignments', async () => {
    return HttpResponse.json(assignments);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Home', () => {
  it('displays filters modal when Filter button is clicked', async () => {
    render(<Home />)

    const filtersModal = await screen.getByTestId('modal');

    expect(filtersModal).not.toBeVisible();

    const filtersButton = await screen.getByRole(
      'button',
      { name: /Filter/ },
    );

    fireEvent.click(filtersButton);

    expect(filtersModal).toBeVisible();
  });

  it('closes filters modal when X button is clicked', async () => {
    render(<Home />)

    const filtersModal = await screen.getByTestId('modal');

    expect(filtersModal).not.toBeVisible();

    const filtersButton = await screen.getByRole(
      'button',
      { name: /Filter/ },
    );

    fireEvent.click(filtersButton);

    expect(filtersModal).toBeVisible();

    const xButton = await screen.getByRole(
      'button',
      { name: /\u{D7}/u },
    );

    fireEvent.click(xButton);

    expect(filtersModal).not.toBeVisible();
  });
});
