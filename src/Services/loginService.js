import axios from "axios"
import { BACKEND_API_URL } from "../config/envConfig"
const baseUrl = `${BACKEND_API_URL}/login`

const loginService = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials)

    return response
  } catch (e) {
    console.error(e)
    return e.response
  }
}

export default loginService
