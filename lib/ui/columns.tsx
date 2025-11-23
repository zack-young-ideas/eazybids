import React, { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { Column } from '@/lib/definitions';

interface ColumnsDisplayContentProps {
  columns: Column[];
  setColumns: (columns: Column[]) => void;
}

interface CheckboxProps extends ColumnsDisplayContentProps {
  index: number;
}

interface CheckboxGroupProps extends ColumnsDisplayContentProps {
  indices: number[];
  label: string;
}

const Checkbox: React.FC<CheckboxProps>  = ({
  columns,
  index,
  setColumns
}) => {
  const changeColumn = () => {
    /*
    Updates the `checked` property of the specified Column object.
    */
    const newColumns = cloneDeep(columns);
    newColumns[index].checked = !newColumns[index].checked;
    setColumns(newColumns);
  }

  return (
    <li className="flex items-center mb-4">
      <input
        className="cursor-pointer w-4 h-4 accent-green-600 text-green-500 bg-gray-100 border-gray-300 rounded-sm focus:ring-green-500 dark:focus-ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        checked={columns[index].checked}
        id={columns[index].id}
        name="column"
        onChange={changeColumn}
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

const CheckboxGroup: React.FC<CheckboxGroupProps>  = ({
  columns,
  indices,
  label,
  setColumns
}) => {
  const checkboxes = indices.map((index) => (
    <Checkbox
      columns={columns}
      index={index}
      key={index}
      setColumns={setColumns}
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

const ColumnsDisplayContent: React.FC<ColumnsDisplayContentProps>  = ({
  columns,
  setColumns,
}) => {
  const [all, setAll] = useState(false);

  const clickAll = () => {
    /*
    Selects all columns.
    */
    const newColumns = cloneDeep(columns);
    if (all) {
      setAll(false);
      newColumns.forEach((object) => {
        object.checked = false;
      });
    } else {
      setAll(true);
      newColumns.forEach((object) => {
        object.checked = true;
      });
    }
    setColumns(newColumns);
  }

  const groups = checkboxGroups.map((group, index) => (
    <CheckboxGroup
      columns={columns}
      indices={group.indices}
      key={index}
      label={group.label}
      setColumns={setColumns}
    />
  ));

  return (
    <div className="p-4 md:p-5 space-y-4">
      <ul>
        <li className="flex items-center mb-4">
          <input
            className="cursor-pointer w-4 h-4 accent-green-600 text-green-500 bg-gray-100 border-gray-300 rounded-sm focus:ring-green-500 dark:focus-ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={all}
            id="all-checkbox"
            name="column"
            onChange={clickAll}
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
  );
}

export default ColumnsDisplayContent;
