const getDate = () => {
  const d = new Date();
  const curr_date = d.getDate();
  let curr_month = d.getMonth();
  curr_month++;
  const curr_year = d.getFullYear();
  const curr_hour = d.getHours();
  const curr_min = d.getMinutes();
  const curr_sec = d.getSeconds();
  return Date(
    curr_date +
      "-" +
      curr_month +
      "-" +
      curr_year +
      " " +
      curr_hour +
      ":" +
      curr_min +
      ":" +
      curr_sec
  );
};

function dateToYMD(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();
  return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
}

module.exports = { getDate, dateToYMD };
