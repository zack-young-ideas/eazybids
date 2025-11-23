/*
 * Defines a utility function used to test the rows of the table of
 * assignments.
 */

import { expect } from '@jest/globals';
import { within } from '@testing-library/react';

const checkRowContents = (
  row,
  firstCell,
  secondCell,
  thirdCell,
  forthCell,
  fifthCell
) => {
  const columns = within(row).getAllByRole('cell');

  expect(columns).toHaveLength(5);
  expect(columns[0]).toHaveTextContent(firstCell);
  expect(columns[1]).toHaveTextContent(secondCell);
  expect(columns[2]).toHaveTextContent(thirdCell);
  expect(columns[3]).toHaveTextContent(forthCell);
  expect(columns[4]).toHaveTextContent(fifthCell);
};

export { checkRowContents };
