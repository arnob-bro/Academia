import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/admin";

export const registerStudentApi = async (data) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const response = await axios.post(
    `${baseURL}/student-admission`,
    data,
    config
  );
  return response.data;
};
