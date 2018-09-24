import moment from 'moment';
// import groupBy as groupByFn from 'lodash/groupBy';

export function groupBy(grouping, array) {
  if (grouping === 'monthly') {
    return groupByWeek(array);
  }
  return groupByDay(array);
}

export function getMonthWeeks() {
  const now = moment().clone();
  const year = now.year();
  const month = now.month();
  const firstDayOfMonth = moment(`${year}-${month}`, 'YYYY-MM-DD');
  const weekIndices = [];

  const currentDay = moment(firstDayOfMonth, 'YYYY-MM-DD');
  weekIndices.push(currentDay.isoWeek());

  while (currentDay.month() === firstDayOfMonth.month()) {
    currentDay.add(1, 'weeks');
    weekIndices.push(currentDay.isoWeek());
  }

  return weekIndices;
}

export function groupByDay(array) {
  const byDay = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };
  array.forEach(value => {
    const d = moment(value.date).isoWeekday();
    byDay[d] = byDay[d] || [];
    byDay[d].push(value);
  });
  return byDay;
}
export function groupByWeek(array) {
  const byWeek = {};
  array.forEach(value => {
    const d = Math.floor(value.date / (1000 * 60 * 60 * 24 * 7));
    byWeek[d] = byWeek[d] || [];
    byWeek[d].push(value);
  });
  return byWeek;
}
export function groupByMonth(array) {
  const byMonth = {};
  array.forEach(value => {
    let d = value.date;
    d = (d.getFullYear() - 1970) * 12 + d.getMonth();
    byMonth[d] = byMonth[d] || [];
    byMonth[d].push(value);
  });
  return byMonth;
}

// const oneDay = 1000 * 60 * 60 * 24;
// const jsStartDay = new Date(-99999999999);
// console.log('jsStartDay', jsStartDay.toString());

// export function groupByDate(data) {
//   return groupBy(data, dt =>
//     moment(dt.date)
//       .startOf('isoWeek')
//       .format('YYYY-MM-DD'),
//   );
// }

// export function groupByTimePeriod(arr, timestamp, period) {
//   const objPeriod = {};
//   const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
//   for (let i = 0; i < arr.length; i += 1) {
//     let d = arr[i][timestamp];
//     if (period === 'day') {
//       d = Math.floor(d.getTime() / oneDay);
//     } else if (period === 'weekly') {
//       d = Math.floor(d.getTime() / (oneDay * 7));
//     } else if (period === 'monthly') {
//       d = (d.getFullYear() - 1970) * 12 + d.getMonth();
//     } else if (period === 'yearly') {
//       d = d.getFullYear();
//     }
//     // define object key
//     objPeriod[d] = objPeriod[d] || [];
//     objPeriod[d].push(arr[i]);
//   }
//   return objPeriod;
// }
