import { Routes, Route } from "react-router-dom";
import { useState, useCallback, useContext } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import SavedCourses from "./pages/SavedCourses";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import { ThemeContext } from "./context/ThemeContext";

function App() {
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

        <Route
          path="/courses/:courseId"
          element={
            <CourseDetail savedCourses={savedCourses} saveCourse={saveCourse} />
          }
        />

        <Route
          path="/saved"
          element={
            <SavedCourses
              savedCourses={savedCourses}
              removeCourse={removeCourse}
            />
          }
        />

        <Route path="/about" element={<About />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
