import React from 'react';
import { Column } from '../definitions';

function Checkbox({ columns, index }) {
  return (
    <li className="flex items-center mb-4">
      <input
        className="cursor-pointer w-4 h-4 accent-green-600 text-green-500 bg-gray-100 border-gray-300 rounded-sm focus:ring-green-500 dark:focus-ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        defaultChecked={columns[index].checked}
        id={columns[index].id}
        name="column"
        type="checkbox"
        value={columns[index].id}
      />
      <label
        className="cursor-pointer ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        htmlFor={columns[index].id}
      >
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
      <h3 className="font-bold mb-4">{label}</h3>
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
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      data-testid="columns-modal"
      style={{ display: display ? 'block' : 'none' }}
    >
      <div
        className="relative p-4 w-full max-w-2xl max-h-full"
      >
        <div
          className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700"
        >
          <div
            className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200"
          >
            <h3
              className="text-xl font-semibold text-gray-900 dark:text-white"
            >
              Columns
            </h3>
            <button
              className="text-xl cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={changeDisplay}
              type="button"
            >
              &times;
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <ul>
              <li className="flex items-center mb-4">
                <input
                  className="cursor-pointer w-4 h-4 accent-green-600 text-green-500 bg-gray-100 border-gray-300 rounded-sm focus:ring-green-500 dark:focus-ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  defaultChecked={false}
                  id="all-checkbox"
                  name="column"
                  type="checkbox"
                  value="all"
                />
                <label
                  className="cursor-pointer ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  htmlFor="all-checkbox"
                >
                  All
                </label>
              </li>
              {groups}
            </ul>
          </div>
          <div
            className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
          >
            <button
              className="cursor-pointer text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-600"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
