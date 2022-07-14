
const getTime = () => {
  let currentDate = new Date()
  let day = currentDate.getDate()
  if (day < 10) day = `0${day}`
  let month = currentDate.getMonth() + 1
  if (month < 10) month = `0${month}`
  let year = currentDate.getFullYear()

  let completeDate = (year + "-" + month + "-" + day)

  let hours = currentDate.getHours() 
  if (hours < 10) hours = `0${hours}`
  let minutes = currentDate.getMinutes()
  if (minutes < 10) minutes = `0${minutes}`
  let seconds = currentDate.getSeconds()
  if (seconds < 10) seconds = `0${seconds}`

  let time = hours + ":" + minutes + ":" + seconds;

  let completeTime = completeDate + "T" + time
  return completeTime

}

export default getTime