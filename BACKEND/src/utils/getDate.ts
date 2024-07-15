
const getDay = () => {
  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()
  const completeDate = (day + '/' + month + '/' + year)

  return completeDate
}

export default getDay
