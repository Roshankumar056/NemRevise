import React from 'react'

const SavedCourseCard = ({course,removeCourse}) => {
  return (
    <div>
      <h3>{course.title}</h3>
      <p>Price:{course.price}</p>
      <button onClick={()=>removeCourse(course.id)}>Remove</button>
    </div>
  )
}

export default SavedCourseCard
