import { NavLink, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("Farmer");

  useEffect(() => {
    const savedUser = JSON.parse(
      localStorage.getItem("precisionFarmingUser") || "null"
    );

    if (savedUser?.name) {
      setUserName(savedUser.name);
    }
  }, []);

  const getNavClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="navbar-container">

        {/* LOGO */}
        <Link
          to="/dashboard"
          className="navbar-logo"
        >
          <span className="logo-icon">
            🌾
          </span>

          <span className="logo-text">
            Precision<span>Farming</span>
          </span>
        </Link>


        {/* NAVIGATION */}
        <div className="navbar-links">

          <NavLink
            to="/home"
            className={getNavClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard"
            className={getNavClass}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/analyze"
            className={getNavClass}
          >
            Analyze Crop
          </NavLink>

          <NavLink
            to="/farm"
            className={getNavClass}
          >
            My Farm
          </NavLink>

          <NavLink
            to="/history"
            className={getNavClass}
          >
            History
          </NavLink>

          <NavLink
            to="/insights"
            className={getNavClass}
          >
            Insights
          </NavLink>

          <NavLink
            to="/how-it-works"
            className={getNavClass}
          >
            How It Works
          </NavLink>

          <NavLink
            to="/dataset"
            className={getNavClass}
          >
            Dataset
          </NavLink>

        </div>


        {/* USER / PROFILE */}
        <div className="navbar-user">

          <Link
            to="/profile"
            className="farmer-profile"
          >

            <span className="profile-icon">
              👨‍🌾
            </span>

            <span className="profile-name">
              {userName}
            </span>

            <span className="profile-arrow">
              ▾
            </span>

          </Link>


          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;