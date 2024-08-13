import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { NUTRITION_API_URL, X_APP_ID, X_APP_KEY } from "../config/envConfig";

type SearchServiceResult = SearchServiceResponse | SearchServiceError;

// Servicio de búsqueda
const searchService = async (search: string): Promise<SearchServiceResult> => {
  const config: AxiosRequestConfig<SearchServiceRequest> = {
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
    const response: AxiosResponse<SearchServiceResponse> = await axios(config);
    return response.data;
  } catch (error: any) {
    console.error(error);
    // Verificar si el error es de Axios
    if (axios.isAxiosError(error) && error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message || "Error en la solicitud",
      };
    } else {
      // Error genérico
      return {
        status: 500,
        message: "An unknown error occurred",
      };
    }
  }
};

export default searchService;
