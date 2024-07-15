'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const getDay = () => {
  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()
  const completeDate = (day + '/' + month + '/' + year)
  return completeDate
}
exports.default = getDay
