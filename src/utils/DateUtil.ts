import moment from "moment";

const compareDate = (a: string, b: string): boolean => {
  return moment(a).isAfter(moment(b));
}

export default {
  compareDate
}