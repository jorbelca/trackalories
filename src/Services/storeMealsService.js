import axios from "axios"
import { BACKEND_API_URL } from "../config/envConfig"
import { setHeader } from './setHeaderToken'
const baseUrl = `${BACKEND_API_URL}/meals`

const storeMealService = async (data, token) => {
  let currentDate = new Date()
  let day = currentDate.getDate()
  let month = currentDate.getMonth() + 1
  let year = currentDate.getFullYear()
  let completeDate = (day + "/" + month + "/" + year)


  const diaryEntry = {
    date: completeDate,
    data: [...data],
  }

  try {
    const response = await axios.post(baseUrl, diaryEntry, {
      headers: setHeader(token),
    })

    return response
  } catch (e) {
    console.error(e)
    return e.response
  }
}


const getMealsService = async (token) => {
  try {
    const response = await axios.get(baseUrl, {
      headers: setHeader(token),
    })

    return response
  } catch (e) {
    console.error(e)
    return e.response
  }
}

export  { storeMealService,getMealsService }
