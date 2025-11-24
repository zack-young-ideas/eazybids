import React from 'react';
import { Assignment, Column } from '@/lib/definitions';

import styles from './table.module.css';

function CrewTableHead({ columns }: { columns: Column[] }) {
  const columnNames = columns.filter((column) => column.displayed)
    .map((column) => (
      <th
        className="px-3 py-1 whitespace-nowrap"
        key={column.id}
      >
        {column.label}
      </th>
    ));

  return (
    <thead className="bg-green-600 text-white">
      <tr>
        <th className="px-3 py-1"></th>
        <th className="px-3 py-1">Number</th>
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
          const value = assignment[column.id];
          if (typeof value === 'number') {
            return (<td className="px-3 py-1" key={column.id}>${
              value.toFixed(2)
            }</td>);
          }
        }
        if (column.id === 'avgPayPerHour') {
          const value = assignment[column.id];
          if (typeof value === 'number') {
            return (<td className="px-3 py-1" key={column.id}>${
              value.toFixed(2)
            }</td>);
          }
        }
        if (column.id === 'allWeeklyPays') {
          const value = assignment[column.id];
          if (Array.isArray(value)) {
            return (<td className="px-3 py-1" key={column.id}>{
              value.map((amount) => `$${amount.toFixed(2)}`)
                .join(', ')
            }</td>);
          }
        }
        if (column.id.startsWith('all')) {
          const value = assignment[column.id];
          if (Array.isArray(value)) {
            return (<td className="px-3 py-1" key={column.id}>{
              value.join(', ')
            }</td>);
          }
        }
        return (
          <td
            className="px-3 py-1"
            key={column.id}
          >
            {assignment[column.id]}
          </td>
        );
      });
    return (
      <tr className="bg-neutral-primary border-b border-gray-100" key={index}>
        <td className="px-3 py-1">{index + 1}</td>
        <td className="px-3 py-1">{assignment.number}</td>
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
    <div className="overflow-x-auto">
      <table className="text-left w-full">
        <CrewTableHead columns={columns} />
        <CrewTableBody columns={columns} assignments={assignments} />
      </table>
    </div>
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
