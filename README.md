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
   - **Budget Tracking:**
     - Monitor and manage the university's budget.
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

3. **Faculty Panel:**
   - **Course Materials:**
     - Upload and manage lecture notes and course materials.
   - **Attendance Tracking:**
     - Record and monitor student attendance.
   - **Academic Performance Tracking:**
     - Assess and track student academic performance.
   - **Scheduling:**
     - Manage personal teaching schedules.
   - **Assignments and Exams:**
     - Create and grade assignments and exams.
   - **Collaboration:**
     - Collaborate with other faculty members and departments.

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
   POST /api/admin/add-teacher
   POST /api/admin/invite-teacher
   POST /api/admin/admit-student
   GET /api/admin/budget-tracker
   POST /api/admin/manage-tuition
   GET /api/admin/reports
   ```
   **Student Panel:**
   ```http
   POST /api/student/enroll
   GET /api/student/courses/:courseId/materials
   POST /api/student/assessments/submit
   GET /api/student/results
   GET /api/student/class-routine
   ```
   **Faculty Panel:**
   ```http
   POST /api/faculty/upload-materials
   POST /api/faculty/track-attendance
   GET /api/faculty/student-performance
   GET /api/faculty/schedule
   POST /api/faculty/manage-assessments
   POST /api/faculty/collaborate
   ```
   **Resource Management:**
   ```http
   POST /api/resource/schedule
   POST /api/resource/library-management
   POST /api/resource/event-management
   ```

   **User Authentication:**
   ```http
   POST /api/auth/login
   ```

## Milestones

### Milestone 1: Foundation and Core Features (1st Checkpoint)
   - Set up the project environment and initialize the repository.
   - Implement user authentication:
      - Secure registration by admin and user login functionality.
   - Develop the course enrollment modules:
      - Allow students to register and enroll in courses.
   - Set up the backend with Laravel and design the database schema for courses, users, and enrollments.
   - Design a basic frontend with React for creating and managing courses.
   
---
### Milestone 2: Academic Management and Scheduling (2nd Checkpoint)
   - Implement class routine and scheduling features:
      - Allow students to view personalized class schedules.
      - Enable faculty to manage teaching schedules.
   - Develop academic record and performance tracking:
      - Allow students to access academic records and results.
      - Enable faculty to track student performance.
   - Integrate API endpoints for academic management and scheduling.
   - Enhance UI/UX for academic interactions with improved designs and responsiveness.

---
### Milestone 3: Resource Management and Advanced Features (Final Checkpoint)
   - Implement resource management modules:
      - Schedule and allocate classrooms and laboratories.
      - Manage library resources and track usage.
      - Organize events and extracurricular activities.
   - Develop administrative features:
      - Manage student admissions and faculty assignments.
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
| 20220104075 | Sayeb Mohaimen          | muhaimen360@gmail.com           | Backend           |
