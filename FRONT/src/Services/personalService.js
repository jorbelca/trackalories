import axios from "axios"
import { BACKEND_API_URL } from "../config/envConfig"
import { setHeader } from "./setHeaderToken"
const baseUrl = `${BACKEND_API_URL}/api/personal`

const getPersonalInfo = async (token) => {
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

const updatePersonalInfo = async (data, token) => {
  try {
    const response = await axios.put(baseUrl, data, {
      headers: setHeader(token),
    })

    return response
  } catch (error) {
    console.error(error)
    return error
  }
}



export { getPersonalInfo, updatePersonalInfo }