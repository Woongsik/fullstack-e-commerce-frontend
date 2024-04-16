import moment from "moment";

export const compareDate = (a: string, b: string): boolean => {
  return moment(a).isAfter(moment(b));
}

export const convertDateToString = (date: Date): string => {
  return moment(date).format('DD.MM.YYYY HH:mm');
}