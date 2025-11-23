/*
Tests to ensure the user can sort assignments.
*/

import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import {
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '@/pages/index';
import assignments from '@/lib/placeholder-data';
import { checkRowContents } from '@/__tests__/utils.ts';

const server = setupServer(
  http.get('/api/assignments', async () => {
    return HttpResponse.json(assignments);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Home', () => {
  it('displays sorting modal when Sort button is clicked', async () => {
    render(<Home />)

    const sortModal = await screen.getByTestId('modal');

    expect(sortModal).not.toBeVisible();

    const sortButton = await screen.getByRole(
      'button',
      { name: /Sort/ },
    );

    fireEvent.click(sortButton);

    expect(sortModal).toBeVisible();
  });

  it('closes sort modal when X button is clicked', async () => {
    render(<Home />)

    const sortModal = await screen.getByTestId('modal');

    expect(sortModal).not.toBeVisible();

    const sortButton = await screen.getByRole(
      'button',
      { name: /Sort/ },
    );

    fireEvent.click(sortButton);

    expect(sortModal).toBeVisible();

    const xButton = await screen.getByRole(
      'button',
      { name: /\u{D7}/u },
    );

    fireEvent.click(xButton);

    expect(sortModal).not.toBeVisible();
  });

  it('sorts assignments based on weekly pay', async () => {
    render(<Home />)

    // We must wait for the list to be retrieved by the API server.
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument()
    }, { timeout: 2000 });

    const sortModal = await screen.getByTestId('modal');
    const sortButton = await screen.getByRole(
      'button',
      { name: /Sort/},
    );
    fireEvent.click(sortButton);

    expect(sortModal).toBeVisible();

    const sortByPay = await screen.getByRole(
      'radio',
      { name: 'Avg. Weekly Pay' },
    );
    const increasing = await screen.getByRole(
      'radio',
      { name: 'Increasing' },
    );
    const submitButton = await screen.getByRole(
      'button',
      { name: /Submit/ },
    );

    fireEvent.click(sortByPay);
    fireEvent.click(increasing);
    fireEvent.click(submitButton);

    expect(sortModal).not.toBeVisible();

    const table = await screen.findByRole('table');
    const tbody = within(table).getAllByRole('rowgroup')[1];
    const rows = within(tbody).getAllByRole('row');

    expect(rows.length).toBe(174);
    checkRowContents(rows[0], '1', '1006', '40:00', '$682.64', 'Brookmere');
    checkRowContents(rows[1], '2', '1007', '40:00', '$682.64', 'Brookmere');
    checkRowContents(rows[2], '3', '1008', '40:00', '$682.64', 'Brookmere');
    checkRowContents(rows[171], '172', '1004', '30:55', '$925.45', 'Brookmere');
    checkRowContents(rows[172], '173', '1028', '44:54', '$955.30', 'Brookmere');
    checkRowContents(rows[173], '174', '1122', '30:20', '$961.95', 'Fairhaven');
  });
});
