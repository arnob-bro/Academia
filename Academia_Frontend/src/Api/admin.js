import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/admin";

export const registerStudentApi = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/student-admission`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error registering student:", error);
    throw error;
  }
};

export const registerFacultyApi = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/faculty-registration`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error registering faculty:", error);
    throw error;
  }
};

export const updateVariablesApi = async (data) => {
  try {
    console.log("Sending request to API with data:", data); // Debugging output
    const response = await axios.get(`${baseURL}/variable-update`, {
      params: { 
        current_semester: data.current_semester,
        semester_starting_date: data.semester_starting_date,
        current_week_no: data.current_week_no,
        current_day_of_week: data.current_day_of_week,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response from API:", response.data); // Debugging output
    return response.data;
  } catch (error) {
    console.error("Error updating variables:", error.response?.data || error.message);
    throw error;
  }

  
};


export const getVariablesApi = async () => {
  try {
    console.log("Sending request to API with data:"); // Debugging output
    const response = await axios.get(`${baseURL}/variables`, {
     
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response from API:", response.data); // Debugging output
    return response.data;
  } catch (error) {
    console.error("Error fetching variables:", error.response?.data || error.message);
    throw error;
  }

  
};
