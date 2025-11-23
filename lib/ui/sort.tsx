import sorts, { Sort } from '@/lib/commands/sorts';
import { CommandArguments } from '@/lib/definitions';

interface SortDisplayContentProps {
  setSort: (sort: string | null) => void;
  setSortDirection: (sortDirection: string) => void;
}

const SortDisplayContent: React.FC<SortDisplayContentProps> = ({
  setSort,
  setSortDirection,
}) => {
  const sortComponents = (
    Object.getOwnPropertyNames(sorts) as (keyof typeof sorts)[]
  ).map(
    (name, index) => {
      const sortObject: Sort = sorts[name];
      return (
        <li
          className="px-3 py-2"
          key={index}
        >
          <div className="inline-flex">
            <label
              className="relative flex items-center cursor-pointer"
              htmlFor={sortObject._id}
            >
              <input
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-green-600 transition-all"
                type="radio"
                id={sortObject._id}
                name="sort"
                onChange={() => setSort(sortObject._id)}
              />
              <span
                className="absolute bg-green-600 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
              </span>
            </label>
            <label
              className="ps-4 cursor-pointer"
              htmlFor={sortObject._id}
            >
              {sortObject._title}
            </label>
          </div>
        </li>
      )
    }
  );

  return (
    <div className="px-4 py-4">
      <ul>
        {sortComponents}
      </ul>
      <div className="ps-3">
        <h4 className="font-bold pb-3 pt-4 text-lg">Direction</h4>
          <div className="inline-flex me-6">
            <label
              className="relative flex items-center cursor-pointer"
              htmlFor="sort-increasing"
            >
              <input
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-green-600 transition-all"
                type="radio"
                id="sort-increasing"
                name="sortDirection"
                onChange={() => setSortDirection('increasing')}
              />
              <span
                className="absolute bg-green-600 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
              </span>
            </label>
            <label
              className="ps-4 cursor-pointer"
              htmlFor="sort-increasing"
            >
              Increasing
            </label>
          </div>
          <div className="inline-flex">
            <label
              className="relative flex items-center cursor-pointer"
              htmlFor="sort-decreasing"
            >
              <input
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-green-600 transition-all"
                type="radio"
                id="sort-decreasing"
                name="sortDirection"
                onChange={() => setSortDirection('decreasing')}
              />
              <span
                className="absolute bg-green-600 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
              </span>
            </label>
            <label
              className="ps-4 cursor-pointer"
              htmlFor="sort-decreasing"
            >
              Decreasing
            </label>
          </div>
      </div>
    </div>
  );
}

interface SortModalFooterProps {
  applyCommand: (commandType: string, commandArgs: CommandArguments) => void;
  hideModal: () => void;
  selectedSort: string | null;
  sortDirection: string;
}

const SortModalFooter: React.FC<SortModalFooterProps> = ({
  applyCommand,
  hideModal,
  selectedSort,
  sortDirection,
}) => {
  const submit = () => {
    applyCommand('sort', { selectedSort, sortDirection });
    hideModal();
  }

  return (
    <div
      className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
    >
      <button
        className="cursor-pointer text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-600"
        onClick={submit}
      >
        Submit
      </button>
    </div>
  );
}

export { SortDisplayContent, SortModalFooter };
