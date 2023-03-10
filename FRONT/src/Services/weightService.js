import axios from "axios"
import { BACKEND_API_URL } from "../config/envConfig"
import getCompleteDate from "./completeDate"
import { setHeader } from './setHeaderToken'
const baseUrl = `${BACKEND_API_URL}/api/weight`


const setPermanentWeights = async (data, token) => {
  const weightEntry = {
    date: getCompleteDate(),
    weight: data,
  }

  try {
    const response = await axios.post(baseUrl, weightEntry, {
      headers: setHeader(token),
    })
    return response

  } catch (error) {
    console.error(error)
    return error
  }
}


const getPermanentWeights = async (token) => {
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

export { setPermanentWeights, getPermanentWeights }
