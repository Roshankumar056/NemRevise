import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to Mini Course Dashboard</h1>

      <p>Explore courses and save your favorites.</p>

      <Link to="/courses">
        <button>Explore Courses</button>
      </Link>
    </div>
  );
}

export default Home;