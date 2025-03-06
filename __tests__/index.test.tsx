import { http, delay, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { render, within, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '../pages/index';
import assignments from '../lib/placeholder-data';

const server = setupServer(
  http.get('/api/assignments', async () => {
    await delay(500);
    return HttpResponse.json(assignments);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Home', () => {
  it('displays loading spinner until data is retrieved', async () => {
    render(<Home />)

    let table = await screen.queryByRole('table');
    let spinner = await screen.findByTestId('spinner');

    // Initially, there is no table displayed.
    expect(table).toBeNull();
    // A spinner is displayed to indicate that the page is loading.
    expect(spinner).toBeInTheDocument();

    table = await screen.findByRole('table');
    spinner = await screen.queryByTestId('spinner');

    // Once the server responds with the data, the table is displayed.
    expect(table).toBeInTheDocument();
    // And the spinner is removed.
    expect(spinner).toBeNull();
  });

  const checkRowContents = (row, firstCell, secondCell) => {
    const columns = within(row).getAllByRole('cell');

    expect(columns).toHaveLength(2);
    expect(columns[0]).toHaveTextContent(firstCell);
    expect(columns[1]).toHaveTextContent(secondCell);
  };

  it('fetches assignment data and displays it in table', async () => {
    render(<Home />)

    const table = await screen.findByRole('table');
    const tbody = within(table).getAllByRole('rowgroup')[1];
    const rows = within(tbody).getAllByRole('row');

    expect(rows.length).toBe(174);
    checkRowContents(rows[0], '1001', 'Brookmere');
    checkRowContents(rows[84], '1085', 'Hampton Bay');
    checkRowContents(rows[93], '1094', 'Westford');
    checkRowContents(rows[100], '1101', 'Northgate');
  });
});
