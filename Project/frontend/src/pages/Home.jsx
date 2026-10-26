import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [userName, setUserName] = useState("Farmer");
  const [fieldCount, setFieldCount] = useState(0);
  const [analysisCount, setAnalysisCount] = useState(0);
  const [detectionCount, setDetectionCount] = useState(0);

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("precisionFarmingUser") || "null"
    );

    const fields = JSON.parse(
      localStorage.getItem("precisionFarmingFields") || "[]"
    );

    const history = JSON.parse(
      localStorage.getItem("precisionFarmingHistory") || "[]"
    );

    if (user?.name) {
      setUserName(user.name);
    }

    setFieldCount(fields.length);
    setAnalysisCount(history.length);

    const detections = history.reduce(
      (total, item) => total + (item.detections?.length || 0),
      0
    );

    setDetectionCount(detections);
  }, []);

  return (
    <main className="home-page">

      {/* ================= HERO ================= */}
      <section className="home-hero">

        <div className="hero-container">

          {/* LEFT CONTENT */}
          <div className="hero-content">

            <div className="hero-badge">
              <span className="badge-dot"></span>
              AI-Powered Precision Agriculture
            </div>

            <h1>
              Smarter Farming.
              <br />
              <span>Healthier Crops.</span>
            </h1>

            <p className="hero-description">
              Use AI-powered crop image analysis to identify possible
              disease, insect activity and abiotic stress from crop
              images — helping you understand your crops faster.
            </p>

            <div className="hero-buttons">

              <Link to="/analyze" className="primary-hero-btn">
                Analyze My Crop
                <span>→</span>
              </Link>

              <Link to="/farm" className="secondary-hero-btn">
                Explore My Farm
              </Link>

            </div>

            <div className="hero-tech">

              <div className="tech-item">
                <strong>CNN</strong>
                <span>Feature Extraction</span>
              </div>

              <div className="tech-divider"></div>

              <div className="tech-item">
                <strong>YOLO</strong>
                <span>Object Detection</span>
              </div>

              <div className="tech-divider"></div>

              <div className="tech-item">
                <strong>AI</strong>
                <span>Crop Insights</span>
              </div>

            </div>

          </div>

          {/* RIGHT VISUAL */}
          <div className="hero-visual">

            <div className="visual-circle circle-one"></div>
            <div className="visual-circle circle-two"></div>

            <div className="analysis-interface">

              {/* Interface Header */}
              <div className="interface-header">

                <div>
                  <span className="interface-small">
                    PRECISION FARMING
                  </span>

                  <strong>Crop Analysis</strong>
                </div>

                <div className="interface-status">
                  <span></span>
                  AI ACTIVE
                </div>

              </div>

              {/* Crop Image */}
              <div className="crop-visual">

                <div className="sky"></div>

                <div className="farm-ground">

                  <div className="crop-row row-one"></div>
                  <div className="crop-row row-two"></div>
                  <div className="crop-row row-three"></div>
                  <div className="crop-row row-four"></div>
                  <div className="crop-row row-five"></div>

                </div>

                {/* Detection Box 1 */}
                <div className="detection detection-disease">

                  <div className="detection-label">
                    <span>Disease</span>
                    <strong>92%</strong>
                  </div>

                </div>

                {/* Detection Box 2 */}
                <div className="detection detection-insect">

                  <div className="detection-label">
                    <span>Insect</span>
                    <strong>86%</strong>
                  </div>

                </div>

                {/* Scan Line */}
                <div className="scan-line"></div>

                <div className="image-tag">
                  AI IMAGE ANALYSIS
                </div>

              </div>

              {/* Interface Bottom */}
              <div className="interface-result">

                <div className="result-left">

                  <div className="result-icon">
                    ✓
                  </div>

                  <div>
                    <span>PRIMARY RESULT</span>
                    <strong>Crop Health Analysis</strong>
                  </div>

                </div>

                <div className="result-right">

                  <span>CONFIDENCE</span>
                  <strong>92%</strong>

                </div>

              </div>

            </div>

            {/* CNN FLOATING CARD */}
            <div className="floating-card cnn-floating">

              <div className="floating-icon">
                C
              </div>

              <div>
                <span>FEATURE EXTRACTION</span>
                <strong>CNN</strong>
              </div>

            </div>

            {/* YOLO FLOATING CARD */}
            <div className="floating-card yolo-floating">

              <div className="floating-icon">
                Y
              </div>

              <div>
                <span>OBJECT DETECTION</span>
                <strong>YOLO</strong>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= TECHNOLOGY STRIP ================= */}
      <section className="technology-strip">

        <div className="technology-container">

          <div className="technology-intro">
            <span>POWERED BY</span>
            <strong>Modern AI Technology</strong>
          </div>

          <div className="technology-items">

            <div className="technology-item">
              <span>01</span>
              <strong>Computer Vision</strong>
            </div>

            <div className="technology-item">
              <span>02</span>
              <strong>CNN</strong>
            </div>

            <div className="technology-item">
              <span>03</span>
              <strong>YOLO</strong>
            </div>

            <div className="technology-item">
              <span>04</span>
              <strong>OpenCV</strong>
            </div>

          </div>

        </div>

      </section>

      {/* ================= INTRO SECTION ================= */}
      <section className="intro-section">

        <div className="section-container">

          <div className="intro-heading">

            <div>

              <span className="section-label">
                PRECISION FARMING
              </span>

              <h2>
                Turn crop images
                <br />
                into useful insights.
              </h2>

            </div>

            <p>
              Precision Farming combines image processing,
              CNN-based feature extraction and YOLO object
              detection to analyse crop images and highlight
              possible crop-health problems.
            </p>

          </div>

          {/* FEATURE CARDS */}
          <div className="feature-grid">

            <div className="feature-card">

              <span className="feature-number">
                01
              </span>

              <div className="feature-icon">
                ↑
              </div>

              <h3>
                Upload Crop Image
              </h3>

              <p>
                Upload a crop photograph from your phone,
                camera or drone imagery.
              </p>

              <Link to="/analyze">
                Start Analysis →
              </Link>

            </div>

            <div className="feature-card">

              <span className="feature-number">
                02
              </span>

              <div className="feature-icon">
                ◈
              </div>

              <h3>
                AI Image Analysis
              </h3>

              <p>
                OpenCV preprocessing prepares the image
                before the AI model analyses it.
              </p>

              <Link to="/how-it-works">
                Learn How It Works →
              </Link>

            </div>

            <div className="feature-card">

              <span className="feature-number">
                03
              </span>

              <div className="feature-icon">
                ◎
              </div>

              <h3>
                Detect Crop Problems
              </h3>

              <p>
                YOLO identifies possible disease, insect
                activity and abiotic stress.
              </p>

              <Link to="/insights">
                View Insights →
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* ================= USER STATS ================= */}
      <section className="monitoring-section">

        <div className="section-container">

          <div className="monitoring-header">

            <div>
              <span className="section-label">
                YOUR PRECISION FARM
              </span>

              <h2>
                Your monitoring overview.
              </h2>
            </div>

            <Link to="/dashboard">
              Open Dashboard →
            </Link>

          </div>

          <div className="monitoring-grid">

            <div className="monitor-card">

              <div className="monitor-icon">
                ⌂
              </div>

              <div className="monitor-value">
                {fieldCount}
              </div>

              <span>
                Registered Fields
              </span>

            </div>

            <div className="monitor-card">

              <div className="monitor-icon">
                ◉
              </div>

              <div className="monitor-value">
                {analysisCount}
              </div>

              <span>
                Crop Analyses
              </span>

            </div>

            <div className="monitor-card">

              <div className="monitor-icon">
                ✦
              </div>

              <div className="monitor-value">
                {detectionCount}
              </div>

              <span>
                AI Detections
              </span>

            </div>

            <div className="monitor-card dark-card">

              <div className="monitor-icon">
                AI
              </div>

              <div className="monitor-value">
                CNN
              </div>

              <span>
                + YOLO Detection
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* ================= WORKFLOW ================= */}
      <section className="workflow-section">

        <div className="section-container">

          <div className="workflow-header">

            <span className="section-label">
              SIMPLE AI WORKFLOW
            </span>

            <h2>
              From image to insight.
            </h2>

            <p>
              The complete analysis process is designed to
              remain simple for the farmer.
            </p>

          </div>

          <div className="workflow">

            <div className="workflow-step">

              <span>01</span>

              <div className="workflow-circle">
                ↑
              </div>

              <h3>
                Upload
              </h3>

              <p>
                Add your crop image.
              </p>

            </div>

            <div className="workflow-connector"></div>

            <div className="workflow-step">

              <span>02</span>

              <div className="workflow-circle">
                ◌
              </div>

              <h3>
                Preprocess
              </h3>

              <p>
                OpenCV prepares the image.
              </p>

            </div>

            <div className="workflow-connector"></div>

            <div className="workflow-step">

              <span>03</span>

              <div className="workflow-circle">
                C
              </div>

              <h3>
                CNN
              </h3>

              <p>
                Extract important features.
              </p>

            </div>

            <div className="workflow-connector"></div>

            <div className="workflow-step">

              <span>04</span>

              <div className="workflow-circle">
                Y
              </div>

              <h3>
                YOLO
              </h3>

              <p>
                Detect possible crop problems.
              </p>

            </div>

            <div className="workflow-connector"></div>

            <div className="workflow-step">

              <span>05</span>

              <div className="workflow-circle">
                ✓
              </div>

              <h3>
                Result
              </h3>

              <p>
                Understand the AI output.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= WELCOME CTA ================= */}
      <section className="home-cta">

        <div className="cta-container">

          <div className="cta-content">

            <span className="section-label">
              WELCOME, {userName.toUpperCase()}
            </span>

            <h2>
              Your crops deserve
              <br />
              smarter monitoring.
            </h2>

            <p>
              Start with a single crop image and explore
              AI-powered crop analysis using CNN and YOLO.
            </p>

            <div className="cta-buttons">

              <Link
                to="/analyze"
                className="cta-primary"
              >
                Analyze My Crop →
              </Link>

              <Link
                to="/how-it-works"
                className="cta-secondary"
              >
                Understand the Technology
              </Link>

            </div>

          </div>

          <div className="cta-visual">

            <div className="cta-orbit orbit-one"></div>
            <div className="cta-orbit orbit-two"></div>

            <div className="cta-center">
              <span>AI</span>
              <strong>CROP</strong>
              <small>ANALYSIS</small>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;