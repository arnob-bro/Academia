import axios from "axios" ;

const baseURL = "http://127.0.0.1:8000/api/faculty";

export const handleFetchCoursesOfAFacultyApi = async (facultyID) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(facultyID);
    const response = await axios.get(`${baseURL}/my-courses/`, facultyID, config);
    console.log(response.data);
    return response.data;
    
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};
