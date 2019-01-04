import './style.css';
import moment from "moment";

const boardCalendar = function(checkDate, endDate) {
  const numSpaceHash = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
  };
  checkDate = moment(checkDate);
  endDate = moment(endDate);
  const startWeek = moment(checkDate)
    .startOf("month")
    .week();
  const endWeek = moment(endDate)
    .endOf("month")
    .week();

  let calendar = [];
  let dayCalender = [];

  const wrapCalendar = document.getElementById("calendar");

  for (let week = startWeek; week < endWeek; week++) {
    calendar.push({
      week: week,
      days: Array(7)
        .fill(0)
        .map((n, i) =>
          moment()
            .week(week)
            .startOf("week")
            .clone()
            .add(n + i, "day")
        )
    });
  }

  console.log(calendar);

  function rendar() {
    for (let i = 0, iMax = calendar.length; i < iMax; i++) {
      for (let n = 0; n < 7; n++) {
        dayCalender.push(moment(calendar[i].days[n]).format("D"));
      }
    }
    dayHead();
    tbodyDraw();
  }
  function dayHead() {
    let shell = "";
    shell += "<tr>";
    for (let i in dayCalender) {
      shell += "<th>";
      shell += dayCalender[i];
      shell += "</th>";
    }
    shell += "</tr>";
    wrapCalendar.getElementsByTagName("thead")[0].innerHTML = shell;
  }
  function tbodyDraw() {
    let shell = "";
    shell += "<tr>";
    for (let i = 0, iMax = calendar.length * 7; i < iMax; i++) {
      shell += "<td>";
      shell += "</td>";
    }
    shell += "</tr>";
    wrapCalendar.getElementsByTagName("tbody")[0].innerHTML = shell;
  }
  rendar();
};

function dayCal() {
  const searchForm = document.getElementById("app");
  const startDay = document.getElementById("startDay").value;
  const endDay = document.getElementById("endDay").value;
  const codereviewSch = new boardCalendar(startDay, endDay);
}
document.getElementById("btn_calendar").addEventListener("click", dayCal);
