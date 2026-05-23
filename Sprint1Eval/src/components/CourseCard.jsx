import { memo } from "react";
import { Link } from "react-router-dom";

function CourseCard({ course, saveCourse, isSaved }) {
  return (
    <div className="card">
      <h3>{course.title}</h3>

      <p>Category: {course.category}</p>
      <p>Duration: {course.duration}</p>
      <p>Level: {course.level}</p>
      <p>Price: ₹{course.price}</p>

      <Link to={`/courses/${course.id}`}>
        <button>View Details</button>
      </Link>

      <button
        onClick={() => saveCourse(course)}
        disabled={isSaved}
      >
        {isSaved ? "Saved" : "Save Course"}
      </button>
    </div>
  );
}

export default memo(CourseCard);