import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "Farmer",
    email: "farmer@example.com",
  });

  useEffect(() => {
    const savedUser = JSON.parse(
      localStorage.getItem("precisionFarmingUser") || "null"
    );

    if (savedUser) {
      setUser({
        name: savedUser.name || "Farmer",
        email: savedUser.email || "farmer@example.com",
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <main className="profile-page">

      {/* HERO */}
      <section className="profile-hero">
        <div className="profile-hero-content">

          <div className="profile-avatar-large">
            👨‍🌾
          </div>

          <div className="profile-hero-info">
            <span className="profile-eyebrow">
              FARMER PROFILE
            </span>

            <h1>{user.name}</h1>

            <p>
              Your Precision Farming account and crop monitoring
              information.
            </p>

            <div className="profile-status">
              <span></span>
              Account Active
            </div>
          </div>

        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="profile-container">

        <div className="profile-grid">

          {/* PERSONAL INFORMATION */}
          <div className="profile-card personal-card">

            <div className="profile-card-heading">
              <div className="profile-card-icon">
                👤
              </div>

              <div>
                <span>ACCOUNT</span>
                <h2>Personal Information</h2>
              </div>
            </div>

            <div className="profile-info-list">

              <div className="profile-info-row">
                <span className="info-icon">👤</span>

                <div>
                  <small>Full Name</small>
                  <strong>{user.name}</strong>
                </div>
              </div>

              <div className="profile-info-row">
                <span className="info-icon">✉️</span>

                <div>
                  <small>Email Address</small>
                  <strong>{user.email}</strong>
                </div>
              </div>

              <div className="profile-info-row">
                <span className="info-icon">🌱</span>

                <div>
                  <small>Account Type</small>
                  <strong>Farmer</strong>
                </div>
              </div>

              <div className="profile-info-row">
                <span className="info-icon">🟢</span>

                <div>
                  <small>Account Status</small>
                  <strong className="active-text">
                    Active
                  </strong>
                </div>
              </div>

            </div>
          </div>

          {/* PLATFORM */}
          <div className="profile-card platform-card">

            <div className="profile-card-heading">
              <div className="profile-card-icon">
                🌾
              </div>

              <div>
                <span>PLATFORM</span>
                <h2>Precision Farming</h2>
              </div>
            </div>

            <p className="platform-description">
              An AI-powered crop monitoring platform designed
              to analyze agricultural images and identify
              possible crop-health related conditions.
            </p>

            <div className="platform-features">

              <div>
                <span>🧠</span>
                <strong>CNN</strong>
                <small>Feature Extraction</small>
              </div>

              <div>
                <span>🎯</span>
                <strong>YOLO</strong>
                <small>Object Detection</small>
              </div>

              <div>
                <span>👁️</span>
                <strong>OpenCV</strong>
                <small>Image Processing</small>
              </div>

            </div>

          </div>

        </div>

        {/* TECHNOLOGIES */}
        <section className="profile-section">

          <div className="profile-section-heading">
            <div>
              <span>PROJECT TECHNOLOGY</span>
              <h2>AI Technologies</h2>
            </div>

            <p>
              Technologies powering the crop analysis system.
            </p>
          </div>

          <div className="profile-tech-grid">

            <div className="profile-tech-card">
              <span>🐍</span>
              <div>
                <strong>Python</strong>
                <small>Backend & AI</small>
              </div>
            </div>

            <div className="profile-tech-card">
              <span>🎯</span>
              <div>
                <strong>YOLO</strong>
                <small>Object Detection</small>
              </div>
            </div>

            <div className="profile-tech-card">
              <span>👁️</span>
              <div>
                <strong>OpenCV</strong>
                <small>Image Processing</small>
              </div>
            </div>

            <div className="profile-tech-card">
              <span>⚛️</span>
              <div>
                <strong>React</strong>
                <small>Frontend</small>
              </div>
            </div>

            <div className="profile-tech-card">
              <span>⚡</span>
              <div>
                <strong>FastAPI</strong>
                <small>API Backend</small>
              </div>
            </div>

          </div>

        </section>

        {/* QUICK ACCESS */}
        <section className="profile-section">

          <div className="profile-section-heading">
            <div>
              <span>QUICK ACCESS</span>
              <h2>Explore Your Farm</h2>
            </div>
          </div>

          <div className="profile-actions">

            <Link to="/dashboard" className="profile-action-card">
              <span>📊</span>
              <div>
                <strong>Dashboard</strong>
                <small>View your farming overview</small>
              </div>
              <b>→</b>
            </Link>

            <Link to="/analyze" className="profile-action-card">
              <span>🔍</span>
              <div>
                <strong>Analyze Crop</strong>
                <small>Upload a crop image</small>
              </div>
              <b>→</b>
            </Link>

            <Link to="/farm" className="profile-action-card">
              <span>🌾</span>
              <div>
                <strong>My Farm</strong>
                <small>Manage your fields</small>
              </div>
              <b>→</b>
            </Link>

            <Link to="/history" className="profile-action-card">
              <span>🕘</span>
              <div>
                <strong>History</strong>
                <small>View previous analyses</small>
              </div>
              <b>→</b>
            </Link>

          </div>

        </section>

        {/* LOGOUT */}
        <div className="profile-logout-section">

          <div>
            <h3>Ready to leave?</h3>

            <p>
              You can safely sign out of your Precision Farming
              account.
            </p>
          </div>

          <button
            className="profile-logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </section>

    </main>
  );
}

export default Profile;