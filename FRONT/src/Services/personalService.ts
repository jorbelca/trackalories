import axios from "axios";
import { VITE_API_URL } from "../config/envConfig";
import { setHeader } from "./setHeaderToken";
const baseUrl = `${VITE_API_URL}/api/personal`;

const getPersonalInfo = async (token: string) => {
  try {
    const response = await axios.get(baseUrl, {
      headers: {
        Authorization: setHeader(token),
        "Content-Type": "application/json; charset=UTF-8 ",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const updatePersonalInfo = async (data: Array<any>, token: string) => {
  try {
    const response = await axios.put(baseUrl, data, {
      headers: {
        Authorization: setHeader(token),
        "Content-Type": "application/json; charset=UTF-8 ",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export { getPersonalInfo, updatePersonalInfo };
