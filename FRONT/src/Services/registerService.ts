import axios from "axios";
import { VITE_API_URL } from "../config/envConfig";
const baseUrl = `${VITE_API_URL}/api/register`;

const registerService = async (credentials: JSON) => {
  try {
    const response = await axios.post(baseUrl, credentials, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json ",
        Accept: "*/*",
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default registerService;
