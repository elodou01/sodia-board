import { Weekday } from "./Weekday";

export type SodiaStatistics = {
  year: number;
  month: number;
  day: number;
  weekday: Weekday;
  hour: number;
  media: string;
  count: number;
};
