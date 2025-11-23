import React, { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import ColumnsDisplayContent from './columns';
import { SortDisplayContent, SortModalFooter } from './sort';
import { Column, CommandArguments } from '@/lib/definitions';

interface ModalProps {
  applyCommand: (commandType: string, commandArgs: CommandArguments) => void;
  columns: Column[];
  hideModal: () => void;
  modalContent: string;
  modalDisplay: boolean;
  setColumns: (columns: Column[]) => void;
}

const Modal: React.FC<ModalProps> = ({
  applyCommand,
  columns,
  hideModal,
  modalContent,
  modalDisplay,
  setColumns
}) => {
  const [sort, setSort] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<string>('ascending');

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
      title = 'Filter the Assignments';
      content = <div></div>;
      footer = <div></div>;
      break;
    case 'sorts':
      title = 'Sort the Assignments';
      content = (
        <SortDisplayContent
          setSort={setSort}
          setSortDirection={setSortDirection}
        />
      );
      footer = (
        <SortModalFooter
          applyCommand={applyCommand}
          hideModal={hideModal}
          selectedSort={sort}
          sortDirection={sortDirection}
        />
      );
      break;

  }

  return (
    <div>
      <div
        className="hidden fixed inset-0 z-40 bg-zinc-800 opacity-50"
        style={{ display: modalDisplay ? 'block' : 'none' }}
      >
      </div>
      <div
        className="hidden overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        data-testid="modal"
        style={{ display: modalDisplay ? 'block' : 'none' }}
      >
        <div
          className="relative m-auto p-4 w-full max-w-2xl max-h-full"
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
    </div>
  );
}

export default Modal;
