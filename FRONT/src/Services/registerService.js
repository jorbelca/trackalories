import axios from "axios"
import { BACKEND_API_URL } from "../config/envConfig"
const baseUrl = `${BACKEND_API_URL}/api/register`

const registerService = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json ",
        Accept: "*/*",
      },
    })

    return response
  } catch (error) {
    console.error(error)
    return error
  }
}

export default registerService
