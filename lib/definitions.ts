/*
Type definitions for the API data.
*/

export type Assignment = {
  number: string;
  avgDailyHours: string;
  allDailyHours: string[];
  avgWeeklyHours: string;
  allWeeklyHours: string[];
  avgPayPerHour: number;
  avgWeeklyPay: number;
  allWeeklyPays: number[];
  earliestOnDutyTime: string;
  latestOnDutyTime: string;
  allOnDutyTimes: string[];
  earliestOffDutyTime: string;
  latestOffDutyTime: string;
  allOffDutyTimes: string[];
  containsSplit: boolean;
  spareboard: boolean;
  avgStopsPerDay?: number;
  allStopsPerDay?: number[];
  onDutyLocation: string;
  lines?: string[];
  [key: string]: string | string[] | number | number[] | boolean | undefined;
};

type AssignmentProperties =
  | 'avgDailyHours'
  | 'allDailyHours'
  | 'avgWeeklyHours'
  | 'allWeeklyHours'
  | 'avgPayPerHour'
  | 'avgWeeklyPay'
  | 'allWeeklyPays'
  | 'earliestOnDutyTime'
  | 'latestOnDutyTime'
  | 'allOnDutyTimes'
  | 'earliestOffDutyTime'
  | 'latestOffDutyTime'
  | 'allOffDutyTimes'
  | 'containsSplit'
  | 'spareboard'
  | 'avgStopsPerDay'
  | 'allStopsPerDay'
  | 'onDutyLocation'
  | 'lines';

export type Column = {
  id: string | AssignmentProperties;
  label: string;
  checked: boolean;
  displayed: boolean;
};

export type CommandArguments = {
  [key: string]: string | null;
}
