import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus delectus inventore, alias quam dignissimos quasi mollitia sapiente nesciunt. Obcaecati, cupiditate autem? Architecto dolores id maxime necessitatibus ducimus fugit inventore voluptas.</p>
        <Link to="/courses">
        <button>Explore Courses</button>
        </Link>
    </div>
  )
}

export default Home
