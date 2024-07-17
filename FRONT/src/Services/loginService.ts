import axios from "axios";
import { VITE_API_URL } from "../config/envConfig";
const baseUrl = `${VITE_API_URL}/api/login`;

const loginService = async (credentials: JSON) => {
  try {
    const response = await axios.post(baseUrl, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default loginService;
