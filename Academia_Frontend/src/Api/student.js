import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/student";
export const courseEnrollApi = async (data) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
  
    const response = await axios.post(
      `${baseURL}/course_enrollment`,
      data,
      config
    );
    return response.data;
  };