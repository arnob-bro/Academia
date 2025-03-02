# Project Overview

### Project Title:
Academia

### Objective:
The Academia is designed to streamline and automate various academic and administrative processes within a university. It facilitates efficient management of courses, students, teachers, and administrative tasks, enhancing the overall educational experience.

### Target Audience:
This system is intended for use by university administrators, faculty members, and students to manage and access academic information seamlessly.

# Tech Stack

### Backend
- **Framework**: Laravel

### Frontend
- **Framework/Library**: React

### Rendering Method
- **Client-Side Rendering (CSR)**

# UI Design
- **Tool**: Figma
- **Design Link**: [Academia Design](https://www.figma.com/design/iJBbszKX2h7dBGLDxm01GF/Academia)

# Project Features:

1. **Admin Panel:**
   - **Student Admission/Enrollment:**
     - Manage student admissions and enrollments.
   - **Faculty Assignment:**
     - Assign faculty to courses and departments.
   - **Tuition Fee Management:**
     - Oversee tuition fee payments and records.
   - **Faculty Leave Review:**
     - Review and manage the leave applications of faculties.
   - **Reporting:**
     - Generate reports on academic performance and resource utilization.

2. **Student Panel:**
   - **Course Enrollment:**
     - Enroll in available courses.
   - **Class Routine:**
     - View personalized class schedules.
   - **Academic Records:**
     - Access academic performance and transcripts.
   - **Results:**
     - View examination results.
   - **Performance Tracker:**
     - View assessment performance.
      - **Attendance Tracking:**
     - Monitor course-wise attendance.

3. **Faculty Panel:**
   - **Course Materials:**
     - Upload and manage lecture notes and course materials.
   - **Attendance Tracking:**
     - Record and monitor student attendance.
   - **Academic Performance Tracking:**
     - Assess and track student academic performance.
   - **Scheduling:**
     - Reschedule personal teaching schedules.
   - **Assessment Results:**
     - Update marks of assessments and exams for each students.

4. **Resource Management:**
   - **Scheduling and Allocation:**
     - Schedule and allocate classrooms and laboratories.
   - **Library Management:**
     - Manage library resources and track usage.
   - **Event Management:**
     - Organize and manage events and extracurricular activities.

5. **User Authentication:**
   - **Login:**
     - Manual Registration ny admin and login functionality for all users.

6. **CRUD Operations:**
   - Manage Courses, Exam schedules, Student records, and user profiles.

7. **API Endpoints:**

   **Admin Panel:**
   ```http
   POST /admin/create-new-course
   POST /admin/edit-an-existing-course
   POST /admin/course-schedule
   POST /admin/leave-application-request
   GET /admin/leave-application-request
   GET /admin/all-courses

   ```
   **Student Panel:**
   ```http
   POST /student/AllInformationsOfStudent
   POST /student/edit-all-information-of-student
   GET /student/weekly-schedule
   GET /student/daily-schedule
   POST /student/course_enrollment
   GET /student/all-available-courses
   GET /student/course-enrollment

   ```
   **Faculty Panel:**
   ```http
   POST /faculty/course-reschedule
   GET /faculty/room-schedule
   POST /faculty/leave-application-request
   GET /faculty/leave-application-request
   GET /faculty/my-courses/
   GET /faculty/courses/{courseID}/all-students
   POST /faculty/schedule/student-attendance/
   GET /faculty/schedule/student-attendance/weeks

   ```
   **Resource Management:**
   ```http
   POST /api/resource/schedule
   POST /api/resource/library-management
   POST /api/resource/event-management
   ```

   **User Authentication:**
   ```http
   POST /api/login
   POST /api/admin/student-admission
   POST /api/admin/faculty-registration
   ```

## Milestones

### Milestone 1: Foundation and Core Features (1st Checkpoint)
   - Set up the project environment and initialize the repository.
   - Implement user authentication:
      - Secure registration by admin and user login functionality.
   - Set up the backend with Laravel and design the database schema for courses, users, and enrollments.
   - Design a basic frontend with React for creating and managing courses.
   
---
### Milestone 2: Academic Management and Scheduling (2nd Checkpoint)
   - Implement class routine and scheduling features:
      - Allow students to view personalized class schedules.
      - Enable faculty to manage teaching schedules.
      - Course schedule management by admin.
   - Develop the course enrollment modules:
      - Allow students to register and enroll in courses.
   - Implement leave applications of faculties.
      - Enable faculty to apply for leaves.
      - Enable admin to review faculties' leaves.
   - Integrate API endpoints for academic management and scheduling.
   - Enhance UI/UX for academic interactions with improved designs.

---
### Milestone 3: Resource Management and Advanced Features (Final Checkpoint)
   - Implement resource management modules:
      - Schedule and allocate classrooms and laboratories.
      - Manage library resources and track usage.
      - Organize events and extracurricular activities.
   - Develop academic record and performance tracking:
      - Allow students to access academic records and performance tracking.
      - Enable faculty to track students' performance.
   - Develop administrative features:
      - Oversee tuition fee payments and budget tracking.
      - Generate reports on academic performance and resource utilization.
   - Finalize UI/UX designs and optimize for performance.
   - Conduct testing, fix bugs, and prepare the project for deployment.
   - Write complete project documentation and deploy the platform.

## Team Members

| ID          | Name                   | Email                              | Role              |
|-------------|------------------------|------------------------------------|-------------------|
| 20200204058 | Mahdi Mubassera        | mubasseramahdi@gmail.com | Frontend |
| 20220104064 | Abdul Mohaimen Khan Arnob | abdulmohaimenkhanarnob@gmail.com | Lead + Frontend + Backend |
| 20220104068 | Samira Ahmed Fiha  | fihaahmed@outlook.com | Frontend          |
| 20220104075 | Sayeb Mohaimen          | muhaimen360@gmail.com           | Frontend           |
