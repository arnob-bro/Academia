import React, { useState, useEffect } from "react";
import Navbarfaculty from "../../navbar/navbarfaculty";
import Footer from "../../footer/footer";
import "./facultyRoutine.css";
import { getWeeklySchedulesApi } from "../../../Api/faculty";
import { getVariablesApi } from "../../../Api/student";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
const TIME_SLOTS = [
  "08:00 am - 09:00 am",
  "09:00 am - 10:00 am",
  "10:00 am - 11:00 am",
  "11:00 am - 12:00 pm",
  "12:00 pm - 01:00 pm",
  "01:00 pm - 02:00 pm",
  "02:00 pm - 03:00 pm",
  "03:00 pm - 04:00 pm",
  "05:00 pm - 06:00 pm",
];

const FacultyRoutine = () => {
  const [schedule, setSchedule] = useState({});
  const [variables, setVariables] = useState({});

  useEffect(() => {
    const fetchVariables = async () => {
      try {
        const variableData = await getVariablesApi();
        console.log("Fetched Variables:", variableData);
        setVariables(variableData);
      } catch (error) {
        console.error("Error fetching variables:", error);
      }
    };

    fetchVariables();
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      const user = JSON.parse(localStorage.getItem("userData"));

      try {
        const scheduleData = await getWeeklySchedulesApi(user.userID);
        console.log("Fetched Schedule:", scheduleData);

        setSchedule(formatSchedule(scheduleData));
        console.log(schedule);
      } catch (error) {
        console.error("Error fetching weekly schedules:", error);
      }
    };

    fetchSchedule();
  }, []);

  // Function to format schedule with empty slots
  const formatSchedule = (apiData) => {
    let fullSchedule = {};

    // Initialize fullSchedule with empty slots
    DAYS.forEach((day) => {
      fullSchedule[day] = {};
      TIME_SLOTS.forEach((slot) => {
        fullSchedule[day][slot] = ""; // Empty by default
      });
    });

    // Time Mapping for Start and End Times
    const timeMapping = {
      "08:00:00": "08:00 am",
      "09:00:00": "09:00 am",
      "10:00:00": "10:00 am",
      "11:00:00": "11:00 am",
      "12:00:00": "12:00 pm",
      "13:00:00": "01:00 pm",
      "14:00:00": "02:00 pm",
      "15:00:00": "03:00 pm",
      "16:00:00": "04:00 pm",
      "17:00:00": "05:00 pm",
      "18:00:00": "06:00 pm",
    };

    // Fill in classes from API response
    apiData.forEach((classItem) => {
      const { day_of_week, start_time, end_time, course_code, room_no } =
        classItem;

      let _start_time = timeMapping[start_time];
      let _end_time = timeMapping[end_time];

      if (!_start_time || !_end_time) return; // Ignore invalid times

      // Find the correct time slot in TIME_SLOTS
      let slotKey = `${_start_time} - ${_end_time}`;

      if (fullSchedule[day_of_week] && TIME_SLOTS.includes(slotKey)) {
        fullSchedule[day_of_week][slotKey] = `${course_code} - ${room_no}`;
      }
    });

    return fullSchedule;
  };

  return (
    <>
      <Navbarfaculty />
      <div className="routine-page">
        <div className="routine-container">
          <h2 className="routine-title">Faculty Class Routine</h2>

          {/* Faculty Info */}
          <div className="routine-info">
            <p>
              <strong>Semester:</strong> {variables.current_semester}
            </p>
            <p>
              <strong>Week:</strong> {variables.current_week_no}
            </p>
          </div>

          {/* Routine Table */}
          <h3 className="semester-title">Class Schedule</h3>
          <div className="routine-table">
            <table>
              <thead>
                <tr>
                  <th>Time/Day</th>
                  {TIME_SLOTS.map((slot) => (
                    <th key={slot}>{slot}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DAYS.map((day) => (
                  <tr key={day}>
                    <td>{day}</td>
                    {TIME_SLOTS.map((slot) => (
                      <td key={slot}>{schedule[day]?.[slot] || ""}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="download-btn">Download PDF</button>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default FacultyRoutine;
