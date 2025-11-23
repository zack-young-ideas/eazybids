import { Assignment } from '@/lib/definitions';

class AvgWeeklyPay {
  direction: string;

  constructor(direction: string) {
    this.direction = direction;
  }

  updateList(currentList: Assignment[]) {
    /*
    Sorts the current list based on average weekly pay amounts.
    */
    if (this.direction === 'increasing') {
      return this.increasing(currentList);
    } else {
      return this.decreasing(currentList);
    }
  }

  increasing(currentList: Assignment[]) {
    /*
    Sorts the list in order by increasing average weekly pay.
    */
    return currentList.sort((assignment1, assignment2) => {
      return assignment1.avgWeeklyPay - assignment2.avgWeeklyPay;
    });
  }

  decreasing(currentList: Assignment[]) {
    /*
    Sorts the list in order by decreasing average weekly pay.
    */
    const newList = this.increasing(currentList);
    return newList.reverse();
  }
}

class OnDutyTime {
  direction: string;

  constructor() {
    this.direction = 'increasing';
  }

  updateList(currentList: Assignment[]) {
    return currentList;
  }
}

class OffDutyTime {
  direction: string;

  constructor() {
    this.direction = 'increasing';
  }

  updateList(currentList: Assignment[]) {
    return currentList;
  }
}

interface SortClass {
  direction: string;
  updateList?(list: Assignment[]): Assignment[];
}

type SortConstructor = new (direction: string) => SortClass;

export type Sort = {
  _id: string;
  _title: string;
  _class: SortConstructor;
}

const sorts = {
  avgWeeklyPay: {
    _id: 'avgWeeklyPay',
    _title: 'Avg. Weekly Pay',
    _class: AvgWeeklyPay,
  },

  onDutyTime: {
    _id: 'onDutyTime',
    _title: 'On-Duty Time',
    _class: OnDutyTime,
  },

  offDutyTime: {
    _id: 'offDutyTime',
    _title: 'Off-Duty Time',
    _class: OffDutyTime,
  },
}

export default sorts;
