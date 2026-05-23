import { useParams, Link } from "react-router-dom";
import courses from "../data/courses";

function CourseDetails({ saveCourse, savedCourses }) {
  const { courseId } = useParams();

  const course = courses.find(
    (c) => c.id === Number(courseId)
  );

  if (!course) {
    return <h2>Course not found</h2>;
  }

  const isSaved = savedCourses.some(
    (item) => item.id === course.id
  );

  return (
    <div>
      <h1>{course.title}</h1>

      <p>Category: {course.category}</p>
      <p>Duration: {course.duration}</p>
      <p>Level: {course.level}</p>
      <p>Price: ₹{course.price}</p>
      <p>{course.description}</p>

      <button
        onClick={() => saveCourse(course)}
        disabled={isSaved}
      >
        {isSaved ? "Saved" : "Save Course"}
      </button>

      <br />
      <br />

      <Link to="/courses">
        <button>Back to Courses</button>
      </Link>
    </div>
  );
}

export default CourseDetails;