import React from 'react';
import {
  FaColumns,
  FaEdit,
  FaFilter,
  FaHistory,
  FaRedo,
  FaRegFile,
  FaRegFileAlt,
  FaSortAmountDown,
  FaUndo,
} from 'react-icons/fa';

interface TopButtonsProps {
  displayModalContent: (content: string) => void;
}

const TopButtons: React.FC<TopButtonsProps> = ({
  displayModalContent,
}) => {
  return (
    <div>
      <div className="bg-zinc-100 flex w-full">
        <button
          className="cursor-pointer flex-1 px-4 py-3 text-gray-600"
          onClick={() => displayModalContent('filters')}
        >
          <div className="flex items-center justify-center pb-2">
            <FaFilter />
          </div>
          Filter
        </button>
        <button
          className="cursor-pointer flex-1 px-4 py-3 text-gray-600"
          onClick={() => displayModalContent('sorts')}
        >
          <div className="flex items-center justify-center pb-2">
            <FaSortAmountDown />
          </div>
          Sort
        </button>
        <button
          className="cursor-pointer flex-1 px-4 py-3 text-gray-600"
          onClick={() => displayModalContent('edit')}
        >
          <div className="flex items-center justify-center pb-2">
            <FaEdit />
          </div>
          Edit
        </button>
        <button
          className="cursor-pointer flex-1 px-4 py-3 text-gray-600"
          onClick={() => displayModalContent('columns')}
        >
          <div className="flex items-center justify-center pb-2">
            <FaColumns />
          </div>
          Columns
        </button>
        <button
          className="cursor-pointer flex-1 px-4 py-3 text-gray-600"
          onClick={() => displayModalContent('history')}
        >
          <div className="flex items-center justify-center pb-2">
            <FaHistory />
          </div>
          History
        </button>
      </div>

      <div className="bg-zinc-200 flex w-full">
        <button
          className="cursor-pointer flex-1 px-4 py-3 text-gray-600"
        >
          <div className="flex items-center justify-center pb-2">
            <FaUndo />
          </div>
          Undo
        </button>
        <button
          className="cursor-pointer flex-1 px-4 py-3 text-gray-600"
        >
          <div className="flex items-center justify-center pb-2">
            <FaRedo />
          </div>
          Redo
        </button>
        <button
          className="cursor-pointer flex-1 px-4 py-3 text-gray-600"
        >
          <div className="flex items-center justify-center pb-2">
            <FaRegFile />
          </div>
          Clear
        </button>
        <button
          className="cursor-pointer flex-1 px-4 py-3 text-gray-600"
        >
          <div className="flex items-center justify-center pb-2">
            <FaRegFileAlt />
          </div>
          Reset
        </button>
      </div>
    </div>
  );
}

export default TopButtons;
