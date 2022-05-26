import axios from "axios"
import { API_URL } from "../config/envConfig"
const baseUrl = `${API_URL}/register`

const registerService = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials)

    return response.data
  } catch (e) {
    console.error(e)
  }
}

export default registerService
