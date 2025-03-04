import React from 'react';

export default function Table({ assignments }) {
  const hideSpinner = (assignments.length > 0);

  const tableRows = assignments.map((item) => {
    return (
      <tr key={item.number}>
        <td>{item.number}</td>
        <td>{item.onDutyLocation}</td>
      </tr>
    );
  });
  const tableContent = (
    <table>
      <thead>
        <tr>
          <th>Number</th>
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
