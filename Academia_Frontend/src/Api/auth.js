import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/Login";

export const login = async (data) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const response = await axios.post(`${baseURL}`, data, config);
  return response.data;
};

export const logout = async () => {
  try {
    localStorage.removeItem("userData");
    alert("Logout successful");
    window.location.href = "/";
  } catch (error) {
    throw new Error("Logout failed: " + error.response.data.message);
  }
};
