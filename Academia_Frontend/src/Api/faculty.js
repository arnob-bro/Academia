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
    console.log("Fetching students for courseID:", courseID);
    const response = await axios.get(
      `${baseURL}/courses/${courseID}/all-students`,
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("Students fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);

    // Propagate the error message from the backend or default message
    if (error.response) {
      const serverError = error.response.data?.error || "Server error occurred";
      throw new Error(serverError);
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Request setup error: " + error.message);
    }
  }
};

export const postAttendanceStatusOfStudentsApi = async (attendanceData) => {
  try {
    const response = await fetch(`${baseURL}/schedule/student-attendance/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attendanceData),
    });
    const result = await response.json(); // Single read
    console.log("Response from API:", result);
    return result; // Return the parsed result
  } catch (error) {
    console.error("Error posting attendance:", error);
    return { error: "Attendance post failed!" };
  }
};

export const fetchLeaveHistoryApi = async (facultyID) => {
  try {
    const response = await axios.get(`${baseURL}/leave-application-request`, {
      params: {
        facultyID: facultyID,
      },
      headers: { "Content-Type": "application/json" },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching leave history:", error);

    if (error.response) {
      const serverError = error.response.data?.error || "Server error occurred";
      throw new Error(serverError);
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Request setup error: " + error.message);
    }
  }
};

export const getFacultyInfoApi = async (facultyID) => {
  try {
    const response = await axios.get(`${baseURL}/${facultyID}/faculty-info`, {
      headers: { "Content-Type": "application/json" },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching leave history:", error);

    if (error.response) {
      const serverError = error.response.data?.error || "Server error occurred";
      throw new Error(serverError);
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Request setup error: " + error.message);
    }
  }
};

export const getDailyScheduleOfAFacultyApi = async (facultyID) => {
  try {
    const response = await axios.get(`${baseURL}/${facultyID}/daily-routine`, {
      headers: { "Content-Type": "application/json" },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching daily schedule:", error);

    if (error.response) {
      const serverError = error.response.data?.error || "Server error occurred";
      throw new Error(serverError);
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Request setup error: " + error.message);
    }
  }
};
