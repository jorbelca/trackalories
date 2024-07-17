import axios from "axios";
import { NUTRITION_API_URL, X_APP_ID, X_APP_KEY } from "../config/envConfig";

const searchService = async (search: string) => {
  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-app-id": X_APP_ID,
      "x-app-key": X_APP_KEY,
    },
    data: { query: search, timezone: "ES/Europe" },
    url: NUTRITION_API_URL,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default searchService;
