import axios from "axios";
import { VITE_API_URL } from "../config/envConfig";
import getCompleteDate from "./completeDate";
import { setHeader } from "./setHeaderToken";
const baseUrl = `${VITE_API_URL}/api/weight`;

const setPermanentWeights = async (data: Array<any>, token: string) => {
  const weightEntry = {
    date: getCompleteDate(),
    weight: data,
  };

  try {
    const response = await axios.post(baseUrl, weightEntry, {
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

const getPermanentWeights = async (token: string) => {
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

export { setPermanentWeights, getPermanentWeights };
