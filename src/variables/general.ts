interface IChartData {
  camp: string;
  country: string;
  id: string;
  lessons: number;
  month: string;
  school: string;
  checked: string;
}
export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const colors = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];
export const removeStringDuplicateUsingFilter = (arr: Array<string>) => {
  let unique_array = arr.filter(
    (elem: string, index: number, self: Array<string>) => {
      return index == self.indexOf(elem);
    }
  );
  return unique_array;
};
export const removeDuplicateOptionsUsingFilter = (
  obj: Array<{ value: string; label: string }>
) => {
  let uniquearray = obj.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (t: { value: string; label: string }) => t.label === value.label
      )
  );
  return uniquearray;
};
export const removeObjDuplicateUsingFilter = (obj: Array<IChartData>) => {
  let uniquearray = obj.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.country === value.country &&
          t.camp === value.camp &&
          t.month === value.month &&
          t.school === value.school
      )
  );
  return uniquearray;
};
export const calculateSum = (arr: Array<number>) => {
  return arr.reduce((total: number, current: number) => {
    return total + current;
  }, 0);
};
export const removeObjDuplicateUsingFilterbycountryandschool = (
  obj: Array<IChartData>
) => {
  let uniquearray = obj.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (t) => t.country === value.country && t.school === value.school
      )
  );
  return uniquearray;
};
