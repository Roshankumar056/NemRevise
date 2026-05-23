import React, { useMemo, useRef, useState } from 'react'
import courses from '../data/courses'
import CourseCard from '../components/CourseCard'

const Courses = ({saveCourse,savedCourses}) => {
    const[search,setSearch]=useState("")
    const[category,setCategory]=useState("All")
    const searchRef=useRef()
const filterdCourses=useMemo(()=>{
    return courses.filter((course)=>{
        const matchesSearch=course.title
        .toLowerCase()
        .includes(search.toLowerCase());

        const matchesCategory=
        category==="All" ||
        course.category===category;
        return matchesSearch && matchesCategory
    });
},[search,category])

  return (
    <div>
      <h1>Courses</h1>
      <input type="text" ref={searchRef} 
      placeholder='Search Courses'
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      />

      <button onClick={()=>searchRef.current.focus()}>Focus Search</button>

      <select value={category} onChange={(e)=>setCategory(e.target.value)} >
        <option>All</option>
        <option>Frontend</option>
        <option>Backend</option>
        <option>AI</option>
        <option>Data</option>
      </select>
      <p>Showing{filterdCourses.length} courses</p>
      <div>
        {filterdCourses.map((course)=>{
            <CourseCard 
            key={course.id}
            course={course}
            saveCourse={saveCourse}
            isSaved={savedCourses.some(
                (item)=>item.id===course.id
            )}
            />
        })}
      </div>
    </div>
  )
}

export default Courses
