/*
Defines an object that keeps track of the columns that are displayed.
*/

const initialColumns = [
  {
    id: 'avgDailyHours',
    label: 'Avg. Daily Hours',
    checked: false,
    displayed: false,
  }, {
    id: 'allDailyHours',
    label: 'Individual Daily Hours',
    checked: false,
    displayed: false,
  }, {
    id: 'avgWeeklyHours',
    label: 'Avg. Weekly Hours',
    checked: true,
    displayed: true,
  }, {
    id: 'allWeeklyHours',
    label: 'Individual Weekly Hours',
    checked: false,
    displayed: false,
  }, {
    id: 'avgPayPerHour',
    label: 'Avg. Pay Per Hour',
    checked: false,
    displayed: false,
  }, {
    id: 'avgWeeklyPay',
    label: 'Avg. Weekly Pay',
    checked: true,
    displayed: true,
  }, {
    id: 'allWeeklyPays',
    label: 'Individual Weekly Pays',
    checked: false,
    displayed: false,
  }, {
    id: 'earliestOnDutyTime',
    label: 'Earliest On-Duty Time',
    checked: false,
    displayed: false,
  }, {
    id: 'latestOnDutyTime',
    label: 'Latest On-Duty Time',
    checked: false,
    displayed: false,
  }, {
    id: 'allOnDutyTimes',
    label: 'All On-Duty Times',
    checked: false,
    displayed: false,
  }, {
    id: 'earliestOffDutyTime',
    label: 'Earliest Off-Duty Time',
    checked: false,
    displayed: false,
  }, {
    id: 'latestOffDutyTime',
    label: 'Latest Off-Duty Time',
    checked: false,
    displayed: false,
  }, {
    id: 'allOffDutyTimes',
    label: 'Individual Off-Duty Times',
    checked: false,
    displayed: false,
  }, {
    id: 'onDutyLocations',
    label: 'On-Duty Locations',
    checked: true,
    displayed: true,
  }, {
    id: 'lines',
    label: 'Lines',
    checked: false,
    displayed: false,
  }, {
    id: 'avgStopsPerDay',
    label: 'Avg. Stops Per Day',
    checked: false,
    displayed: false,
  }, {
    id: 'allStopsPerDay',
    label: 'Individual Stops Per Day',
    checked: false,
    displayed: false,
  },
];

export default initialColumns;
