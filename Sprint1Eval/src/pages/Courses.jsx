import { useMemo, useRef, useState } from "react";
import courses from "../data/courses";
import CourseCard from "../components/CourseCard";

function Courses({ saveCourse, savedCourses }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const searchRef = useRef();

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        course.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div>
      <h1>Courses</h1>

      <input
        ref={searchRef}
        type="text"
        placeholder="Search courses"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={() => searchRef.current.focus()}>
        Focus Search
      </button>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>All</option>
        <option>Frontend</option>
        <option>Backend</option>
        <option>AI</option>
        <option>Data</option>
      </select>

      <p>Showing {filteredCourses.length} courses</p>

      <div className="grid">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            saveCourse={saveCourse}
            isSaved={savedCourses.some(
              (item) => item.id === course.id
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default Courses;