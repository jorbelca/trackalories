import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "http://www.IA_helper.com"
    : "http://localhost:3000";
const baseUrl = `${API_URL}/api/describeImage`;

const describeImage = async (image: File) => {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await axios.post(baseUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default describeImage;
