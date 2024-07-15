const getCompleteDate = () => {
  let currentDate = new Date()
  let day = currentDate.getDate()
  let month = currentDate.getMonth() + 1
  let year = currentDate.getFullYear()
  let completeDate = year + "/" + month + "/" + day
  return completeDate
}

export default getCompleteDate
