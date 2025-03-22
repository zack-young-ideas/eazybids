/*
Tests to ensure the user can change the columns that are displayed.
*/

import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { render, fireEvent, within, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '../pages/index';
import Modal from '../lib/ui/modal';
import assignments from '../lib/placeholder-data';
import initialColumns from '../lib/columns';

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
    const columnsModal = await screen.getByTestId('columns-modal');

    expect(columnsModal).not.toBeVisible();

    const columnsButton = await screen.getByRole(
      'button',
      { name: /Columns/},
    );

    fireEvent.click(columnsButton);

    expect(columnsModal).toBeVisible();
  });

  it('closes columns modal when X button is clicked', async () => {
    render(<Home />)
    const columnsModal = await screen.getByTestId('columns-modal');
    const columnsButton = await screen.getByRole(
      'button',
      { name: /Columns/},
    );

    fireEvent.click(columnsButton);

    expect(columnsModal).toBeVisible();

    const xButton = await screen.getByRole(
      'button',
      { name: /X/},
    );

    fireEvent.click(xButton);

    expect(columnsModal).not.toBeVisible();
  });
});

describe('Modal', () => {
  it('has default columns checked off', async () => {
    render(<Modal
      display={true}
      changeDisplay={() => null}
      columns={initialColumns}
    />)
    const checkedBoxes = [
      ['All', false],
      ['Avg. Daily Hours', false],
      ['Individual Daily Hours', false],
      ['Avg. Weekly Hours', true],
      ['Individual Weekly Hours', false],
      ['Avg. Pay Per Hour', false],
      ['Avg. Weekly Pay', true],
      ['Individual Weekly Pays', false],
      ['Earliest On-Duty Time', false],
      ['Latest On-Duty Time', false],
      ['All On-Duty Times', false],
      ['Earliest Off-Duty Time', false],
      ['Latest Off-Duty Time', false],
      ['Individual Off-Duty Times', false],
      ['On-Duty Locations', true],
      ['Lines', false],
      ['Avg. Stops Per Day', false],
      ['Individual Stops Per Day', false],
    ];

    const checkboxes = await screen.getAllByRole('checkbox')

    checkedBoxes.forEach((pair) => {
      const [ label, checked ] = pair;
      const checkbox = screen.getByRole('checkbox', { name: label });

      expect(checkbox.checked).toEqual(checked);
    });
  });
});
