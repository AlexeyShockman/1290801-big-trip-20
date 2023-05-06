import dayjs from 'dayjs';
import duration from "dayjs/plugin/duration";

dayjs.extend(duration)

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';

/** возвращает случайный элемент массива*/
function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

/** возвращает случайное число от min (включительно) до(не включительно) max */
function getRandomInt(max, min=0) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}


/** возвращает (строка) дату в человекопонятном виде. Если стоит флаг true вторым аргументом, то возвращает время */
function humanizeDate(date, itsTime) {
  const format = !itsTime ? DATE_FORMAT : TIME_FORMAT;
  return date ? dayjs(date).format(format) : '';
}

/** Возвращает (строка) разницу во времени между двумя датами в формате Y Mth H D M */
function timeDifference(timeFrom, timeTo) {
  const diff = dayjs.duration(dayjs(timeTo).diff(dayjs(timeFrom))).$d
  return (`${diff.year ? diff.year + 'Y ' : ''}`
    +`${diff.months ? diff.months + 'Mth ' : ''}`
    +`${diff.days ? diff.days + 'D ' : ''}`
    +`${diff.hours ? diff.hours + 'H ' : ''}`
    +`${diff.minutes ? diff.minutes + 'M' : ''}`).trimEnd()
}

/** Возвращает строку со временем UTC. Оно будет случайным и выше текущей даты до недели.
 * Если передать параметром строку с UTC временем, то вернет случайное время со сдвигом от него на расстояние до недели.*/
function getRandomTimeFrom (timeFrom) {
  const day = getRandomInt(7);
  const hour = getRandomInt(24);
  const minute = getRandomInt(60);
  if (!timeFrom) {
    return dayjs().add(day, 'day').add(hour, 'hour').add(minute, 'minute').format()
  } else {
    return dayjs(timeFrom).add(day, 'day').add(hour, 'hour').add(minute, 'minute').format()

  }
}




export {getRandomArrayElement, humanizeDate, timeDifference, getRandomInt, getRandomTimeFrom};
