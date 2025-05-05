/*
Tests to ensure the table is rendered properly.
*/

import { render, fireEvent, within, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Table from '../lib/ui/table';
import assignments from '../lib/placeholder-data';
import initialColumns from '../lib/columns';

describe('Table', () => {
  it('displays columns and assignments', async () => {
    render(
      <Table
        assignments={assignments.assignments}
        columns={initialColumns}
      />
    );

    const table = await screen.findByRole('table')
    const thead = within(table).getAllByRole('rowgroup')[0];
    const columns = within(thead).getAllByRole('columnheader');
    const tbody = within(table).getAllByRole('rowgroup')[1];
    const rows = within(tbody).getAllByRole('row');

    expect(columns).toHaveLength(5);
    expect(columns[0]).toHaveTextContent(/^$/);
    expect(columns[1]).toHaveTextContent('Number');
    expect(columns[2]).toHaveTextContent('Avg. Weekly Hours');
    expect(columns[3]).toHaveTextContent('Avg. Weekly Pay');
    expect(columns[4]).toHaveTextContent('On-Duty Location');
    expect(rows).toHaveLength(174);
  });
});
