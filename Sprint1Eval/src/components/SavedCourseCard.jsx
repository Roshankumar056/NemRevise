function SavedCourseCard({ course, removeCourse }) {
  return (
    <div className="card">
      <h3>{course.title}</h3>

      <p>Price: ₹{course.price}</p>

      <button onClick={() => removeCourse(course.id)}>
        Remove
      </button>
    </div>
  );
}

export default SavedCourseCard;