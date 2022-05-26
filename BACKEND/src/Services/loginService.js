import axios from "axios"
import { API_URL } from "../config/envConfig"
const baseUrl = `${API_URL}/login`

const loginService = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials)

    return response
  } catch (e) {
    console.error(e)
  }
}

export default loginService
