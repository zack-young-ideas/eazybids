/*
Tests to ensure the user can change the columns that are displayed.
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
  it('displays default columns', async () => {
    render(<Home />)

    const table = await screen.findByRole('table')
    const thead = within(table).getAllByRole('rowgroup')[0];
    const columns = within(thead).getAllByRole('columnheader');

    expect(columns).toHaveLength(5);
    expect(columns[0]).toHaveTextContent(/^$/);
    expect(columns[1]).toHaveTextContent('Number');
    expect(columns[2]).toHaveTextContent('Avg. Weekly Hours');
    expect(columns[3]).toHaveTextContent('Avg. Weekly Pay');
    expect(columns[4]).toHaveTextContent('On-Duty Location');
  });

  it('displays columns modal when Columns button is clicked', async () => {
    render(<Home />)

    expect(screen.getByTestId('columns-modal')).not.toBeVisible();

    const columnsButton = await screen.getByRole(
      'button',
      { name: /Columns/},
    );

    fireEvent.click(columnsButton);

    const columnsModal = await screen.getByTestId('columns-modal');

    expect(columnsModal).toBeVisible();
  });
});
