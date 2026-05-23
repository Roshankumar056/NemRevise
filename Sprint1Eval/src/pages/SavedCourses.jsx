import { useMemo } from "react";
import SavedCourseCard from "../components/SavedCourseCard";

function SavedCourses({
  savedCourses,
  removeCourse
}) {
  const totalPrice = useMemo(() => {
    return savedCourses.reduce(
      (acc, curr) => acc + curr.price,
      0
    );
  }, [savedCourses]);

  if (savedCourses.length === 0) {
    return <h2>No saved courses yet</h2>;
  }

  return (
    <div>
      <h1>Saved Courses</h1>

      <h3>Total Saved: {savedCourses.length}</h3>

      <h3>Total Price: ₹{totalPrice}</h3>

      {savedCourses.map((course) => (
        <SavedCourseCard
          key={course.id}
          course={course}
          removeCourse={removeCourse}
        />
      ))}
    </div>
  );
}

export default SavedCourses;