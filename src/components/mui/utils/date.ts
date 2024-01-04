import { format, isThisYear, formatDistanceToNow, getTime } from 'date-fns'

export const formatRelativeDate = (date: Date) => {
  const _date = new Date(date)

  return isThisYear(_date) ? formatDistanceToNow(_date, { addSuffix: true }) : format(_date, 'MMM d, y')
}

export function fDateMonth(date: Date) {
  return format(new Date(date), 'MMMM yyyy')
}

export function fDate(date: Date) {
  return format(new Date(date), 'dd MMMM yyyy')
}

export function fDateTime(date: Date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm')
}

export function fTimestamp(date: Date) {
  return getTime(new Date(date))
}

export function fDateTimeSuffix(date: Date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p')
}

export function getDateFormatted(date: Date) {
  return date.toLocaleString().split(',')[0]
}

export function formatDateWithHours(date: Date) {
  const hours = date.getHours()
  let minutes: string | number = date.getMinutes()
  minutes = minutes < 10 ? '0' + minutes : minutes
  const strTime = hours + ':' + minutes
  return (
    date.getDate() +
    '/' +
    `${date.getMonth() < 9 ? '0' : ''}` +
    (date.getMonth() + 1) +
    '/' +
    date.getFullYear() +
    ' ' +
    strTime.toString()
  )
}
export function fToNow(date: Date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  })
}
