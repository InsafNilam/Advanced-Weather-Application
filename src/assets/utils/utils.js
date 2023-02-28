export const monthDict = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const getDate = () => {
  let date = new Date();
  let hour = date.getHours() >= 12 ? date.getHours() - 12 : date.getHours();
  let mm =
    date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
  let am_pm = date.getHours() >= 12 ? "pm" : "am";
  let day = date.getDate();
  let month = monthDict[date.getMonth()];

  return hour + "." + mm + am_pm + ", " + month + " " + day;
};
