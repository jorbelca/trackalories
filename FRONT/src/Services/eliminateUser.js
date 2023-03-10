import axios from "axios"
import { BACKEND_API_URL } from "../config/envConfig"
import { setHeader } from "./setHeaderToken"
const baseUrl = `${BACKEND_API_URL}/api/eliminate`


const eliminateUser = async (token) => {

  try {
    const response = await axios.delete(baseUrl, {
      headers: setHeader(token),
    })

    return response
  } catch (error) {
    console.error(error)
    return error
  }
}


export default eliminateUser