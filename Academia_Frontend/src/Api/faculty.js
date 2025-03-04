import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/faculty";

export const handleFetchCoursesOfAFacultyApi = async (facultyID) => {
  try {
    const response = await axios.get(`${baseURL}/my-courses/`, {
      params: { facultyID }, // Pass facultyID as query param
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const fetchStudentsOfSelectedCourseApi = async (courseID) => {
  try {
    console.log(courseID);
    const response = await axios.get(
      `${baseURL}/courses/${courseID}/all-students`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};
