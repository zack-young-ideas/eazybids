import React from 'react';
import { Column } from '../definitions';

function Checkbox({ columns, index }) {
  return (
    <li className="column-checkbox">
      <input
        defaultChecked={columns[index].checked}
        id={columns[index].id}
        name="column"
        type="checkbox"
        value={columns[index].id}
      />
      <label htmlFor={columns[index].id}>
        {columns[index].label}
      </label>
    </li>
  );
}

function CheckboxGroup({
  columns,
  indices,
  label,
}) {
  const checkboxes = indices.map((index) => (
    <Checkbox
      columns={columns}
      index={index}
    />
  ));

  return (
    <div>
      <h3>{label}</h3>
      {checkboxes}
    </div>
  );
}

const checkboxGroups = [
  {
    label: 'Daily Hours',
    indices: [0, 1],
  }, {
    label: 'Weekly Hours',
    indices: [2, 3],
  }, {
    label: 'Pay',
    indices: [4, 5, 6],
  }, {
    label: 'On-Duty Times',
    indices: [7, 8, 9],
  }, {
    label: 'Off-Duty Times',
    indices: [10, 11, 12],
  }, {
    label: 'Locations',
    indices: [13, 14],
  }, {
    label: 'Stops Per Day',
    indices: [15, 16],
  },
];

export default function Modal({
  display, changeDisplay, columns,
}: {
  display: boolean, changeDisplay: Function, columns: Column[]
}) {
  const groups = checkboxGroups.map((group) => (
    <CheckboxGroup
      columns={columns}
      indices={group.indices}
      label={group.label}
    />
  ));

  return (
    <div
      style={{ display: display ? 'block' : 'none' }}
      data-testid="columns-modal"
    >
      <button onClick={changeDisplay}>X</button>
      <h2>Columns</h2>
      <div>
        <ul>
          <li>
            <input
              defaultChecked={false}
              id="all-checkbox"
              name="column"
              type="checkbox"
              value="all"
            />
            <label htmlFor="all-checkbox">
              All
            </label>
          </li>
          {groups}
        </ul>
      </div>
    </div>
  );
}
