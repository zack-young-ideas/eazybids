import React from 'react';
import { Assignment } from '../definitions';

export default function Table({
  assignments,
}: {
  assignments: Assignment[],
}) {
  const hideSpinner = (assignments.length > 0);

  const tableRows = assignments.map((item, index) => {
    return (
      <tr key={item.number}>
        <td>{index + 1}</td>
        <td>{item.number}</td>
        <td>{item.avgWeeklyHours}</td>
        <td>${item.avgWeeklyPay.toFixed(2)}</td>
        <td>{item.onDutyLocation}</td>
      </tr>
    );
  });
  const tableContent = (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Number</th>
          <th>Avg. Weekly Hours</th>
          <th>Avg. Weekly Pay</th>
          <th>On-Duty Location</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  );
  const spinnerContent = (
    <div data-testid="spinner">x</div>
  );

  if (hideSpinner) {
    return tableContent;
  } else {
    return spinnerContent;
  }
}
