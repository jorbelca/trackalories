import axios from "axios"
import { BACKEND_API_URL } from "../config/envConfig"
import getCompleteDate from "./completeDate"
import { setHeader } from './setHeaderToken'
const baseUrl = `${BACKEND_API_URL}/api/meals`


const storeMealService = async (data, token) => {
  const diaryEntry = {
    date: getCompleteDate(),
    data: [...data],
  }

  try {
    const response = await axios.post(baseUrl, diaryEntry, {
      headers: setHeader(token),
    })

    return response
  } catch (error) {
    console.error(error)
    return error
  }
}


const getMealsService = async (token) => {
  try {
    const response = await axios.get(baseUrl, {
      headers: setHeader(token),
    })

    return response
  } catch (error) {
    console.error(error)
    return error
  }
}

export { storeMealService, getMealsService }
