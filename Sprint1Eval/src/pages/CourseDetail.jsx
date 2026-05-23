import React from 'react'
import { Link, useParams } from 'react-router-dom'
import courses from '../data/courses'

const CourseDetail = ({saveCourse,savedCourses}) => {

    const {courseId}=useParams()
const course=courses.find(
    (e)=>e.id===Number(courseId)
)
if(!course){
    return <h2>Course Not Found</h2>
}
const isSaved=savedCourses.some(
    (ele)=>ele.id===course.id
)
  return (
    <div>
       <h3>{course.title}</h3>
      <p>Category:{course.category}</p>
      <p>Duration:{course.duration}</p>
      <p>Level:{course.level}</p>
      <p>Price:{course.price}</p>
      <p>{course.description}</p>
      <button onClick={()=>saveCourse(course)} disabled={isSaved}>
        {isSaved?"Saved":"Save Course"}
      </button>
      <br />
      <br />

      <Link>
      <button>
        Back to Courses
        </button>
        </Link>
    </div>
  )
}

export default CourseDetail
