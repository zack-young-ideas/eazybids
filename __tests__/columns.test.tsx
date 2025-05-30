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
  it('displays columns modal when Columns button is clicked', async () => {
    render(<Home />)

    const modal = await screen.getByTestId('modal');

    expect(modal).not.toBeVisible();

    const columnsButton = await screen.getByRole(
      'button',
      { name: /Columns/},
    );

    fireEvent.click(columnsButton);

    expect(modal).toBeVisible();
  });

  it('closes columns modal when X button is clicked', async () => {
    render(<Home />)

    const modal = await screen.getByTestId('modal');
    const columnsButton = await screen.getByRole(
      'button',
      { name: /Columns/},
    );

    fireEvent.click(columnsButton);

    expect(modal).toBeVisible();

    const xButton = await screen.getByRole(
      'button',
      { name: /\u{D7}/u},
    );

    fireEvent.click(xButton);

    expect(modal).not.toBeVisible();
  });

  it('allows user to select new columns', async () => {
    render(<Home />)

    let table = await screen.findByRole('table')
    let thead = within(table).getAllByRole('rowgroup')[0];
    let columns = within(thead).getAllByRole('columnheader');

    expect(columns).toHaveLength(5);
    expect(columns[0]).toHaveTextContent(/^$/);
    expect(columns[1]).toHaveTextContent('Number');
    expect(columns[2]).toHaveTextContent('Avg. Weekly Hours');
    expect(columns[3]).toHaveTextContent('Avg. Weekly Pay');
    expect(columns[4]).toHaveTextContent('On-Duty Location');

    const columnsButton = await screen.getByRole(
      'button',
      { name: /Columns/},
    );
    fireEvent.click(columnsButton);
    const modal = await screen.getByTestId('modal');

    expect(modal).toBeVisible();

    let firstCheckbox = screen.getByRole(
      'checkbox',
      { name: 'Earliest On-Duty Time' }
    );
    let secondCheckbox = screen.getByRole(
      'checkbox',
      { name: 'Latest Off-Duty Time' }
    );
    let thirdCheckbox = screen.getByRole(
      'checkbox',
      { name: 'Avg. Weekly Hours' }
    );
    const updateButton = await screen.getByRole(
      'button',
      { name: /Update/},
    );
    fireEvent.click(firstCheckbox);
    fireEvent.click(secondCheckbox);
    fireEvent.click(thirdCheckbox);
    fireEvent.click(updateButton);

    table = await screen.findByRole('table')
    thead = within(table).getAllByRole('rowgroup')[0];
    columns = within(thead).getAllByRole('columnheader');

    expect(columns).toHaveLength(6);
    expect(columns[0]).toHaveTextContent(/^$/);
    expect(columns[1]).toHaveTextContent('Number');
    expect(columns[2]).toHaveTextContent('Avg. Weekly Pay');
    expect(columns[3]).toHaveTextContent('Earliest On-Duty Time');
    expect(columns[4]).toHaveTextContent('Latest Off-Duty Time');
    expect(columns[5]).toHaveTextContent('On-Duty Location');
  });

  it('allows user to select all columns', async () => {
    render(<Home />)

    const columnsButton = await screen.getByRole(
      'button',
      { name: /Columns/},
    );
    fireEvent.click(columnsButton);
    const modal = await screen.getByTestId('modal');

    expect(modal).toBeVisible();

    let allCheckbox = screen.getByRole(
      'checkbox',
      { name: 'All' }
    );
    fireEvent.click(allCheckbox);

    const checkboxes = await screen.getAllByRole('checkbox')

    checkboxes.forEach((checkbox) => {
      expect(checkbox.checked).toEqual(true);
    });

    fireEvent.click(allCheckbox);

    checkboxes.forEach((checkbox) => {
      expect(checkbox.checked).toEqual(false);
    });
  });
});

describe('Modal', () => {
  it('has default columns checked off', async () => {
    render(<Modal
      columns={initialColumns}
      hideModal={() => null}
      modalContent={'columns'}
      modalDisplay={true}
      setColumns={() => null}
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
      ['On-Duty Location', true],
      ['Lines', false],
      ['Avg. Stops Per Day', false],
      ['Individual Stops Per Day', false],
    ];

    checkedBoxes.forEach((pair) => {
      const [ label, checked ] = pair;
      const checkbox = screen.getByRole('checkbox', { name: label });

      expect(checkbox.checked).toEqual(checked);
    });
  });

  it('allows user to select all columns', async () => {
    const mockSetColumns = jest.fn();
    render(<Modal
      columns={initialColumns}
      hideModal={() => null}
      modalContent={'columns'}
      modalDisplay={true}
      setColumns={mockSetColumns}
    />)

    let allCheckbox = screen.getByRole(
      'checkbox',
      { name: 'All' }
    );
    fireEvent.click(allCheckbox);

    mockSetColumns.mock.calls[0][0].forEach((column) => {
      expect(column.checked).toEqual(true);
    });
  });
});
