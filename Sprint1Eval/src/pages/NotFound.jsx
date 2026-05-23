import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1>404 Page Not Found</h1>

      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
}

export default NotFound;