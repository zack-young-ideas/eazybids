import React from 'react';
import { Assignment, Column } from '../definitions';

import styles from './table.module.css';

function CrewTableHead({ columns }: { columns: Column[] }) {
  const columnNames = columns.filter((column) => column.displayed)
    .map((column) => <th key={column.id}>{column.label}</th>);

  return (
    <thead>
      <tr>
        <th></th>
        <th>Number</th>
        {columnNames}
      </tr>
    </thead>
  );
}

function CrewTableBody({
  assignments,
  columns,
}: {
  assignments: Assignment[],
  columns: Column[],
}) {
  const rows = assignments.map((assignment, index) => {
    const columnData = columns.filter((column) => column.displayed)
      .map((column) => {
        if (column.id === 'avgWeeklyPay') {
          return (<td key={column.id}>${
            assignment[column.id].toFixed(2)
          }</td>);
        }
        if (column.id === 'avgPayPerHour') {
          return (<td key={column.id}>${
            assignment[column.id].toFixed(2)
          }</td>);
        }
        if (column.id === 'allWeeklyPays') {
          return (<td key={column.id}>{
            assignment[column.id].map((amount) => `$${amount.toFixed(2)}`)
              .join(', ')
          }</td>);
        }
        return (<td key={column.id}>{assignment[column.id]}</td>);
      });
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{assignment.number}</td>
        {columnData}
      </tr>
    )
  });

  return (
    <tbody>
      {rows}
    </tbody>
  );
}

export default function Table({
  assignments,
  columns,
}: {
  assignments: Assignment[],
  columns: Column[],
}) {
  const hideSpinner = (assignments.length > 0);

  const tableContent = (
    <table>
      <CrewTableHead columns={columns} />
      <CrewTableBody columns={columns} assignments={assignments} />
    </table>
  );
  const spinnerContent = (
    <div
      data-testid="spinner"
      className={styles.loadingSpinner}
    >
      Loading...
    </div>
  );

  if (hideSpinner) {
    return tableContent;
  } else {
    return spinnerContent;
  }
}
