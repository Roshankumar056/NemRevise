import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const CourseCard = ({course,saveCourse,isSaved}) => {
  return (
    <div>
      <h3>{course.title}</h3>
      <p>Category:{course.category}</p>
      <p>Duration:{course.duration}</p>
      <p>Level:{course.level}</p>
      <p>Price:{course.price}</p>
      <Link to={`/courses/${course.id}`}>
      <button>View Details</button>
      </Link>
    <button onClick={()=>saveCourse(course)} disabled={isSaved}>
        {isSaved?"Saved":"Save Course"}
    </button>
    </div>
  )
}

export default memo(CourseCard)
//  id: 6,
//     title: "Ai/ml Basic",
//     category: "Frontend",
//     duration: "25hours",
//     level: "Beginner",
//     price: 1200,
//     description: