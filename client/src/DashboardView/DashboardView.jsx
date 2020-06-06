import React from "react";
import CourseBox from "./components/CourseBox.jsx";
import CalendarContainer from "./components/CalendarContainer.jsx";

const DashboardView = () => {
  const courses = [
    { name: "Javascript 101", code: "IF12312" },
    { name: "Java 101", code: "IF12312" },
    { name: "C# 101", code: "IF12312" },
    { name: "C++ 101", code: "IF12312" },
  ];

  const renderCourseBox = courses.map((course, index) => {
    return (
      <div key={index}>
        <CourseBox data={course} index={index} />
      </div>
    );
  });

  return (
    <div>
      <div className="dashboard-content">
        <div className="dashboard-course-container">{renderCourseBox}</div>
        <CalendarContainer />
      </div>
    </div>
  );
};

export default DashboardView;
