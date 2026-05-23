import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Navbar({ savedCount }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/courses">Courses</NavLink>
        <NavLink to="/saved">
          Saved ({savedCount})
        </NavLink>
        <NavLink to="/about">About</NavLink>
      </div>

      <button onClick={toggleTheme}>
        {theme === "light"
          ? "Switch to Dark Mode"
          : "Switch to Light Mode"}
      </button>
    </nav>
  );
}

export default Navbar;