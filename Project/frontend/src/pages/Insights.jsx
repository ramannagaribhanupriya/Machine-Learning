import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Insights.css";

function Insights() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("precisionFarmingHistory") || "[]"
    );

    setHistory(savedHistory);
  }, []);

  const getCondition = (item) => {
    if (item.condition) {
      return item.condition;
    }

    if (item.detections?.length > 0) {
      return item.detections[0]?.class || "Unknown";
    }

    return "No Detection";
  };

  const getStatus = (item) => {
    const condition = getCondition(item).toLowerCase();

    if (condition.includes("disease")) {
      return "Disease";
    }

    if (condition.includes("insect")) {
      return "Insect";
    }

    if (condition.includes("abiotic")) {
      return "Abiotic";
    }

    if (condition.includes("healthy")) {
      return "Healthy";
    }

    return "No Detection";
  };

  const diseaseCount = history.filter(
    (item) => getStatus(item) === "Disease"
  ).length;

  const insectCount = history.filter(
    (item) => getStatus(item) === "Insect"
  ).length;

  const abioticCount = history.filter(
    (item) => getStatus(item) === "Abiotic"
  ).length;

  const healthyCount = history.filter(
    (item) => getStatus(item) === "Healthy"
  ).length;

  const totalDetections =
    diseaseCount +
    insectCount +
    abioticCount +
    healthyCount;

  const latestAnalysis = history.length > 0
    ? history[0]
    : null;

  const latestCondition = latestAnalysis
    ? getCondition(latestAnalysis)
    : "No Analysis";

  const latestStatus = latestAnalysis
    ? getStatus(latestAnalysis)
    : "No Detection";

  const averageConfidence = useMemo(() => {
    const values = history
      .map((item) => Number(item.confidence))
      .filter((value) => !Number.isNaN(value));

    if (values.length === 0) {
      return 0;
    }

    return (
      values.reduce((sum, value) => sum + value, 0) /
      values.length
    );
  }, [history]);

  const getPercentage = (count) => {
    if (totalDetections === 0) {
      return 0;
    }

    return Math.round(
      (count / totalDetections) * 100
    );
  };

  return (
    <main className="insights-page">

      {/* HERO */}

      <section className="insights-hero">

        <div className="insights-hero-content">

          <div className="insights-label">
            <span>✦</span>
            AI CROP INSIGHTS
          </div>

          <h1>
            Understand Your
            <span> Crop Results</span>
          </h1>

          <p>
            Turn your crop analysis history into simple,
            useful insights about detected diseases,
            insects and abiotic stress.
          </p>

        </div>

        <div className="insights-hero-orbit">

          <div className="orbit-ring"></div>

          <div className="orbit-center">
            🌾
          </div>

          <div className="orbit-item orbit-one">
            🦠
          </div>

          <div className="orbit-item orbit-two">
            🐛
          </div>

          <div className="orbit-item orbit-three">
            🌿
          </div>

        </div>

      </section>


      {/* QUICK NUMBERS */}

      <section className="insights-section">

        <div className="insights-section-heading">
          <div>
            <h2>AI Monitoring Summary</h2>
            <p>
              A simple view of what your analyses are showing.
            </p>
          </div>
        </div>


        <div className="insights-stat-grid">

          <div className="insight-stat-card">

            <div className="insight-stat-icon green">
              ◉
            </div>

            <div>
              <span>Total Analyses</span>
              <strong>{history.length}</strong>
              <small>Crop scans saved</small>
            </div>

          </div>


          <div className="insight-stat-card">

            <div className="insight-stat-icon red">
              🦠
            </div>

            <div>
              <span>Disease</span>
              <strong>{diseaseCount}</strong>
              <small>
                {getPercentage(diseaseCount)}% of detections
              </small>
            </div>

          </div>


          <div className="insight-stat-card">

            <div className="insight-stat-icon orange">
              🐛
            </div>

            <div>
              <span>Insects</span>
              <strong>{insectCount}</strong>
              <small>
                {getPercentage(insectCount)}% of detections
              </small>
            </div>

          </div>


          <div className="insight-stat-card">

            <div className="insight-stat-icon yellow">
              🌿
            </div>

            <div>
              <span>Abiotic Stress</span>
              <strong>{abioticCount}</strong>
              <small>
                {getPercentage(abioticCount)}% of detections
              </small>
            </div>

          </div>

        </div>

      </section>


      {/* MAIN INSIGHTS GRID */}

      <section className="insights-main-grid">

        {/* LATEST ANALYSIS */}

        <div className="latest-insight-card">

          <div className="card-heading">

            <div>
              <span className="card-eyebrow">
                MOST RECENT
              </span>

              <h2>Latest Analysis</h2>
            </div>

            <Link to="/history">
              View History →
            </Link>

          </div>


          {latestAnalysis ? (

            <div className="latest-analysis-content">

              <div className="latest-image">

                {latestAnalysis.annotated_image ||
                latestAnalysis.preview ||
                latestAnalysis.image ? (

                  <img
                    src={
                      latestAnalysis.annotated_image ||
                      latestAnalysis.preview ||
                      latestAnalysis.image
                    }
                    alt="Latest crop analysis"
                  />

                ) : (

                  <div className="latest-image-placeholder">
                    🌱
                  </div>

                )}

              </div>


              <div className="latest-analysis-details">

                <div className="latest-status">
                  <span>
                    CURRENT RESULT
                  </span>

                  <strong>
                    {latestStatus}
                  </strong>
                </div>

                <h3>
                  {latestCondition}
                </h3>

                <p>
                  {latestAnalysis.fieldName
                    ? `Analysis from ${latestAnalysis.fieldName}.`
                    : "Latest saved crop analysis."}
                </p>


                <div className="latest-meta">

                  <div>
                    <span>Crop</span>
                    <strong>
                      {latestAnalysis.crop ||
                        "Not specified"}
                    </strong>
                  </div>

                  <div>
                    <span>Confidence</span>
                    <strong>
                      {latestAnalysis.confidence
                        ? `${Number(
                            latestAnalysis.confidence
                          ).toFixed(1)}%`
                        : "—"}
                    </strong>
                  </div>

                  <div>
                    <span>Affected Area</span>
                    <strong>
                      {latestAnalysis.affected_area ||
                        "—"}
                    </strong>
                  </div>

                </div>

              </div>

            </div>

          ) : (

            <div className="insights-empty-small">

              <div>
                🌱
              </div>

              <h3>
                No analysis available
              </h3>

              <p>
                Analyze a crop image to start generating
                useful insights.
              </p>

              <Link to="/analyze">
                Analyze Crop →
              </Link>

            </div>

          )}

        </div>


        {/* MODEL CLASSES */}

        <div className="model-insight-card">

          <div className="card-heading">

            <div>
              <span className="card-eyebrow">
                AI MODEL
              </span>

              <h2>Detected Classes</h2>
            </div>

          </div>


          <div className="class-list">

            <div className="class-item">

              <div className="class-icon disease-icon">
                🦠
              </div>

              <div className="class-info">
                <strong>Disease</strong>
                <span>
                  Possible crop disease detected
                </span>
              </div>

              <div className="class-count">
                {diseaseCount}
              </div>

            </div>


            <div className="class-item">

              <div className="class-icon insect-icon">
                🐛
              </div>

              <div className="class-info">
                <strong>Insect</strong>
                <span>
                  Possible insect activity detected
                </span>
              </div>

              <div className="class-count">
                {insectCount}
              </div>

            </div>


            <div className="class-item">

              <div className="class-icon abiotic-icon">
                🌿
              </div>

              <div className="class-info">
                <strong>Abiotic</strong>
                <span>
                  Possible environmental stress
                </span>
              </div>

              <div className="class-count">
                {abioticCount}
              </div>

            </div>

          </div>


          <div className="model-note">

            <span>✦</span>

            <p>
              The current CADI-AI model uses these
              three detection classes.
            </p>

          </div>

        </div>

      </section>


      {/* CONFIDENCE SECTION */}

      <section className="confidence-section">

        <div className="confidence-header">

          <div>
            <span className="card-eyebrow">
              MODEL PERFORMANCE
            </span>

            <h2>Analysis Confidence</h2>

            <p>
              Average confidence from your saved
              AI analysis results.
            </p>
          </div>

          <div className="confidence-number">
            {averageConfidence > 0
              ? `${averageConfidence.toFixed(1)}%`
              : "—"}
          </div>

        </div>


        <div className="large-confidence-bar">

          <div
            className="large-confidence-fill"
            style={{
              width: `${Math.min(
                averageConfidence,
                100
              )}%`,
            }}
          />

        </div>

      </section>


      {/* EXPLANATION */}

      <section className="explain-insights">

        <div className="explain-visual">

          <div className="explain-main-circle">
            🧠
          </div>

          <div className="explain-small one">
            📷
          </div>

          <div className="explain-small two">
            🔍
          </div>

          <div className="explain-small three">
            📊
          </div>

        </div>


        <div className="explain-content">

          <span className="card-eyebrow">
            UNDERSTAND THE RESULT
          </span>

          <h2>
            What does the AI result mean?
          </h2>

          <p>
            The system analyzes your crop image using
            computer vision and the CNN + YOLO pipeline.
            It looks for visual patterns related to the
            classes present in the trained dataset.
          </p>


          <div className="explain-points">

            <div>
              <span>01</span>

              <div>
                <strong>Image Analysis</strong>
                <p>
                  Your crop image is processed before
                  AI detection.
                </p>
              </div>
            </div>


            <div>
              <span>02</span>

              <div>
                <strong>Object Detection</strong>
                <p>
                  YOLO identifies possible regions
                  belonging to trained classes.
                </p>
              </div>
            </div>


            <div>
              <span>03</span>

              <div>
                <strong>Farmer-Friendly Result</strong>
                <p>
                  The technical prediction is shown
                  in a simpler format.
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* IMPORTANT NOTE */}

      <section className="insights-warning">

        <div className="warning-icon">
          !
        </div>

        <div>

          <strong>
            Important
          </strong>

          <p>
            AI predictions are intended to support
            crop monitoring and decision making.
            They should not be treated as a guaranteed
            diagnosis or a replacement for expert
            agricultural advice.
          </p>

        </div>

      </section>


      {/* CTA */}

      <section className="insights-cta">

        <div>

          <span>
            READY FOR ANOTHER CHECK?
          </span>

          <h2>
            Analyze your crop again.
          </h2>

          <p>
            Upload a new crop image and let the
            CNN + YOLO pipeline analyze it.
          </p>

        </div>

        <Link to="/analyze">
          Analyze New Crop
          <span>→</span>
        </Link>

      </section>

    </main>
  );
}

export default Insights;