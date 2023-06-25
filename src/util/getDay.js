function getDayOfWeek(day, month, year) {
  return new Date(year, month, day).toLocaleString('en-us', {
    weekday: 'long',
  })
}

const now = new Date()
const todayIs = getDayOfWeek(now.getDate(), now.getMonth(), now.getFullYear())
console.log(todayIs)
