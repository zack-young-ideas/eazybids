const sorts = {
  avgWeeklyPay: {
    _id: 'avgWeeklyPay',
    _title: 'Avg. Weekly Pay',
    _class: class {
      constructor(direction) {
        this.direction = direction;
      }

      updateList(currentList) {
        /*
        Sorts the current list based on average weekly pay amounts.
        */
        if (this.direction === 'increasing') {
          return this.increasing(currentList);
        } else {
          return this.decreasing(currentList);
        }
      }

      increasing(currentList) {
        /*
        Sorts the list in order by increasing average weekly pay.
        */
        return currentList.sort((assignment1, assignment2) => {
          return assignment1.avgWeeklyPay - assignment2.avgWeeklyPay;
        });
      }

      decreasing(currentList) {
        /*
        Sorts the list in order by decreasing average weekly pay.
        */
        const newList = this.increasing(currentList);
        return newList.reverse();
      }
    }
  },

  onDutyTime: {
    _id: 'onDutyTime',
    _title: 'On-Duty Time',
  },

  offDutyTime: {
    _id: 'offDutyTime',
    _title: 'Off-Duty Time',
  },
}

export default sorts;
