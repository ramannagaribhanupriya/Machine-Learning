import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}

        <div className="footer-brand">

          <Link
            to="/dashboard"
            className="footer-logo"
          >
            <span className="footer-logo-icon">
              🌾
            </span>

            <span>
              Precision<span>Farming</span>
            </span>
          </Link>

          <p>
            AI-powered crop monitoring using
            computer vision and YOLO-based
            object detection.
          </p>

        </div>


        {/* QUICK LINKS */}

        <div className="footer-column">

          <h3>
            Quick Links
          </h3>

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/analyze">
            Analyze Crop
          </Link>

          <Link to="/farm">
            My Farm
          </Link>

          <Link to="/history">
            History
          </Link>

        </div>


        {/* PROJECT */}

        <div className="footer-column">

          <h3>
            Project
          </h3>

          <Link to="/dataset">
            Dataset
          </Link>

          <Link to="/how-it-works">
            How It Works
          </Link>

          <Link to="/insights">
            Crop Insights
          </Link>

        </div>


        {/* TECHNOLOGIES */}

        <div className="footer-column">

          <h3>
            Technologies
          </h3>

          <span>
            Python
          </span>

          <span>
            FastAPI
          </span>

          <span>
            React
          </span>

          <span>
            YOLO
          </span>

        </div>

      </div>


      {/* BOTTOM */}

      <div className="footer-bottom">

        <p>
          © 2026 Precision Farming
        </p>

        <span>
          CNN + YOLO • Smart Crop Monitoring
        </span>

      </div>

    </footer>
  );
}

export default Footer;