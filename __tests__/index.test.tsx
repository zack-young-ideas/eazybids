import { http, delay, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '@/pages/index';
import assignments from '@/lib/placeholder-data';
import { checkRowContents } from '@/__tests__/utils.ts';

const server = setupServer(
  http.get('/api/assignments', async () => {
    await delay(1000);
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

    // Once the server responds with the data, the table is displayed.
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument()
    }, { timeout: 2000 });

    // And the spinner is removed.
    spinner = await screen.queryByTestId('spinner');
    expect(spinner).toBeNull();
  });

  it('fetches assignment data and displays it in table', async () => {
    render(<Home />)

    // Wait for the server to return the assignment data.
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument()
    }, { timeout: 2000 });

    const table = await screen.findByRole('table');
    const tbody = within(table).getAllByRole('rowgroup')[1];
    const rows = within(tbody).getAllByRole('row');

    expect(rows.length).toBe(174);
    checkRowContents(rows[0], '1', '1001', '31:35', '$908.60', 'Brookmere');
    checkRowContents(
      rows[84], '85', '1085', '42:13', '$789.30', 'Hampton Bay'
    );
    checkRowContents(rows[93], '94', '1094', '43:35', '$777.76', 'Westford');
    checkRowContents(
      rows[100], '101', '1101', '44:41', '$802.53', 'Northgate'
    );
  });
});
