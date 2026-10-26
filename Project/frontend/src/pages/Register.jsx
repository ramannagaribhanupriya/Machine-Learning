import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all the fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const user = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password,
      };

      localStorage.setItem(
        "precisionFarmingUser",
        JSON.stringify(user)
      );

      localStorage.removeItem("isLoggedIn");

      setLoading(false);
      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    }, 500);
  };

  return (
    <div className="register-page">

      {/* LEFT VISUAL SECTION */}
      <div className="register-visual">

        <div className="register-visual-overlay">

          {/* BRAND */}
          <div className="register-brand">

            <span>🌾</span>

            <strong>
              Precision<span>Farming</span>
            </strong>

          </div>


          {/* HERO */}
          <div className="register-hero-content">

            <span className="register-tag">
              🌱 AI-Powered Crop Monitoring
            </span>

            <h1>
              Start Your
              <br />
              <span>Smart Farming Journey.</span>
            </h1>

            <p>
              Create your farmer account and monitor
              your crop fields using CNN-based analysis
              and YOLO object detection.
            </p>


            {/* FEATURES */}
            <div className="register-features">

              <div>

                <span>🌾</span>

                <div>
                  <strong>Manage Your Fields</strong>

                  <small>
                    Keep your farm information organized
                  </small>
                </div>

              </div>


              <div>

                <span>🤖</span>

                <div>
                  <strong>AI Crop Analysis</strong>

                  <small>
                    Analyze crop images with AI
                  </small>
                </div>

              </div>


              <div>

                <span>📊</span>

                <div>
                  <strong>Track Your Results</strong>

                  <small>
                    Review your crop analysis history
                  </small>
                </div>

              </div>

            </div>

          </div>


          {/* BOTTOM */}
          <div className="register-visual-bottom">
            CNN + YOLO • Smart Crop Monitoring
          </div>

        </div>

      </div>


      {/* RIGHT FORM SECTION */}
      <div className="register-form-section">

        <div className="register-form-container">

          {/* MOBILE BRAND */}
          <div className="register-mobile-brand">

            <span>🌾</span>

            <strong>
              Precision<span>Farming</span>
            </strong>

          </div>


          {/* HEADING */}
          <div className="register-heading">

            <span className="register-small-label">
              GET STARTED
            </span>

            <h2>
              Create Account
            </h2>

            <p>
              Create your farmer account to start
              monitoring your crops.
            </p>

          </div>


          {/* FORM */}
          <form
            className="register-form"
            onSubmit={handleSubmit}
          >

            {/* NAME */}
            <div className="register-field">

              <label htmlFor="name">
                Full Name
              </label>

              <div className="register-input-wrapper">

                <span>👤</span>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                />

              </div>

            </div>


            {/* EMAIL */}
            <div className="register-field">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="register-input-wrapper">

                <span>✉️</span>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />

              </div>

            </div>


            {/* PASSWORD */}
            <div className="register-field">

              <label htmlFor="password">
                Password
              </label>

              <div className="register-input-wrapper">

                <span>🔒</span>

                <input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />

              </div>

            </div>


            {/* CONFIRM PASSWORD */}
            <div className="register-field">

              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <div className="register-input-wrapper">

                <span>🔐</span>

                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                />

              </div>

            </div>


            {/* ERROR */}
            {error && (
              <div className="register-error">
                ⚠️ {error}
              </div>
            )}


            {/* SUCCESS */}
            {success && (
              <div className="register-success">
                ✅ {success}
              </div>
            )}


            {/* BUTTON */}
            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >

              {loading
                ? "Creating Account..."
                : "Create Account →"}

            </button>

          </form>


          {/* LOGIN LINK */}
          <div className="register-login-text">

            Already have an account?

            <Link
              to="/login"
              className="register-login-link"
            >
              Sign In
            </Link>

          </div>


          {/* FOOTER NOTE */}
          <div className="register-footer-note">

            <span>🔐</span>

            Your account information is stored locally
            for this project prototype.

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;