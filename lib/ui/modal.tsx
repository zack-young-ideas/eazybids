import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import ColumnsDisplayContent from './columns.tsx';

export default function Modal({
  columns,
  hideModal,
  modalContent,
  modalDisplay,
  setColumns
}: {
  columns: Column[],
  hideModal: Function,
  modalContent: string,
  modalDisplay: boolean,
  setColumns: Function,
}) {
  const update = () => {
    const newColumns = cloneDeep(columns);
    newColumns.forEach((object) => {
      const column = object;
      column.displayed = object.checked;
    });
    setColumns(newColumns);
    hideModal();
  }

  let title;
  let content;
  let footer;
  switch(modalContent) {
    case 'columns':
      title = 'Select Columns';
      content = (
        <ColumnsDisplayContent
          columns={columns}
          hideModal={hideModal}
          setColumns={setColumns}
        />
      );
      footer = (
        <div
          className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            className="cursor-pointer text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-600"
            onClick={update}
          >
            Update
          </button>
        </div>
      );
      break;
    case 'filters':
      title = 'Filters';
      content = <div></div>;
      footer = <div></div>;
      break;
  }

  return (
    <div
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      data-testid="modal"
      style={{ display: modalDisplay ? 'block' : 'none' }}
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
              { title }
            </h3>
            <button
              className="text-xl cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={ hideModal }
              type="button"
            >
              &times;
            </button>
          </div>
          { content }
          { footer }
        </div>
      </div>
    </div>
  );
}
