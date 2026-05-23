import React, { useCallback, useContext, useState } from "react";
import { ThemeContext } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import SavedCourses from "./pages/SavedCourses";

const App = () => {
  const [savedCourses, setSavedCourses] = useState([]);
  const { theme } = useContext(ThemeContext);

  const saveCourse = useCallback((course) => {
    setSavedCourses((prev) => {
      const exists = prev.find((item) => item.id === course.id);
      if (exists) {
        alert("Course already saved");
        return prev;
      }
      return [...prev, course];
    });
  }, []);

  const removeCourse = useCallback((id) => {
    setSavedCourses((prev) => prev.filter((course) => course.id !== id));
  }, []);
  return (
    <div className={theme}>
      <Navbar savedCount={savedCourses.length} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/courses"
          element={
            <Courses savedCourses={savedCourses} saveCourse={saveCourse} />
          }
        />
        \
        <Route
          path="/courses/:courseId"
          element={
            <CourseDetail savedCourses={savedCourses} saveCourse={saveCourse} />
          }
        />
        <Route path="/saved" element={<SavedCourses  savedCourses={savedCourses} sa/>}/>
      </Routes>
    </div>
  );
};

export default App;
