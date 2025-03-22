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
};

export type Column = {
  id: string;
  label: string;
  checked: boolean;
  displayed: boolean;
};
