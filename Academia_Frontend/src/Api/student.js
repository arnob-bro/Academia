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
  export const fetchEnrolledCoursesOfAStudentOfASemester = async (data) => {
    const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
    const response = await axios.get(`${baseURL}/enrolled_courses`,data,config );
    return response.data;   
};
export const getAllCoursesApi = async () => {
    const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
    const response = await axios.get(`${baseURL}/all-available-courses`,config);
    return response.data;
  };