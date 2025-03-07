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
  // const response = await axios.get(`${baseURL}/enrolled_courses`, data, config);
  // return response.data;
};
export const getAllCoursesApi = async () => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const response = await axios.get(`${baseURL}/all-available-courses`, config);
  console.log(response.data);
  return response.data;
};

export const getStudentInfoApi = async (studentID) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/student/${studentID}/student-info`, // Ensure the correct route format
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching available courses",
      error.response?.data || error
    );
    throw error;
  }
};

export const getAllSelectedCoursesApi = async (studentID) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/student/course-enrollment`,
      {
        params: { studentID },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching enrolled courses:",
      error.response?.data || error
    );
    throw error;
  }
};

export const fetchDailyScheduleApi = async (studentID) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/student/daily-schedule`,
      {
        params: { studentID },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching daily schedule:",
      error.response?.data || error
    );
    throw error;
  }
};

export const enrollInCourseApi = async (studentID, courseID) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/student/course_enrollment`,
      {
        studentID: studentID,
        courseID: courseID,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching daily schedule:",
      error.response?.data || error
    );
    throw error;
  }
};

export const removeCourseApi = async (studentID, courseID) => {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/student/${studentID}/course-enrollment/${courseID}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error removing enrollment:", error.response?.data || error);
    throw error;
  }
};
