import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [userName, setUserName] = useState("Farmer");
  const [fields, setFields] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedUser = JSON.parse(
      localStorage.getItem("precisionFarmingUser") || "null"
    );

    const savedFields = JSON.parse(
      localStorage.getItem("precisionFarmingFields") || "[]"
    );

    const savedHistory = JSON.parse(
      localStorage.getItem("precisionFarmingHistory") || "[]"
    );

    if (savedUser?.name) {
      setUserName(savedUser.name);
    }

    setFields(savedFields);
    setHistory(savedHistory);
  }, []);

  const statistics = useMemo(() => {
    let disease = 0;
    let insect = 0;
    let abiotic = 0;

    history.forEach((item) => {
      const condition = String(
        item.condition ||
          item.primary_condition ||
          item.detections?.[0]?.class ||
          ""
      ).toLowerCase();

      if (condition.includes("disease")) {
        disease++;
      } else if (condition.includes("insect")) {
        insect++;
      } else if (condition.includes("abiotic")) {
        abiotic++;
      }
    });

    return {
      totalFields: fields.length,
      totalAnalyses: history.length,
      disease,
      insect,
      abiotic,
      issues: disease + insect + abiotic,
    };
  }, [fields, history]);

  const latestAnalysis = history.length > 0 ? history[0] : null;

  const getCondition = (item) => {
    const condition =
      item?.condition ||
      item?.primary_condition ||
      item?.detections?.[0]?.class ||
      "No detection";

    return String(condition);
  };

  const getStatus = (item) => {
    const condition = getCondition(item).toLowerCase();

    if (condition.includes("disease")) {
      return "Disease Detected";
    }

    if (condition.includes("insect")) {
      return "Insect Detected";
    }

    if (condition.includes("abiotic")) {
      return "Abiotic Stress";
    }

    return "No Detection";
  };

  const getStatusClass = (item) => {
    const condition = getCondition(item).toLowerCase();

    if (condition.includes("disease")) {
      return "dashboard-danger";
    }

    if (condition.includes("insect")) {
      return "dashboard-warning";
    }

    if (condition.includes("abiotic")) {
      return "dashboard-info";
    }

    return "dashboard-success";
  };

  const getConfidence = (item) => {
    const confidence = Number(item?.confidence || 0);

    if (!confidence) {
      return "—";
    }

    return confidence <= 1
      ? `${(confidence * 100).toFixed(1)}%`
      : `${confidence.toFixed(1)}%`;
  };

  const formatDate = (value) => {
    if (!value) return "Not available";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Not available";
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="dashboard-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="dashboard-hero">
        <div className="dashboard-hero-content">

          <div>
            <span className="dashboard-badge">
              🌾 Precision Farming Dashboard
            </span>

            <h1>
              Welcome back, <span>{userName}</span>
            </h1>

            <p>
              Monitor your fields, analyze crop images, and track
              AI-powered crop health results in one place.
            </p>
          </div>

          <Link to="/analyze" className="dashboard-analyze-button">
            🔍 Analyze Crop
          </Link>

        </div>
      </section>

      {/* =========================
          MAIN
      ========================= */}

      <main className="dashboard-container">

        {/* Statistics */}

        <section className="dashboard-stats">

          <div className="dashboard-stat-card">
            <div className="stat-icon">🌱</div>
            <div>
              <span>Total Fields</span>
              <strong>{statistics.totalFields}</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">🔍</div>
            <div>
              <span>Total Analyses</span>
              <strong>{statistics.totalAnalyses}</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">⚠️</div>
            <div>
              <span>Issues Detected</span>
              <strong>{statistics.issues}</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="stat-icon">🧠</div>
            <div>
              <span>AI Classes</span>
              <strong>3</strong>
            </div>
          </div>

        </section>

        {/* =========================
            LATEST ANALYSIS
        ========================= */}

        <section className="dashboard-section">

          <div className="dashboard-section-heading">

            <div>
              <h2>Latest Crop Analysis</h2>
              <p>Your most recent AI-powered crop inspection</p>
            </div>

            <Link to="/history" className="dashboard-view-link">
              View History →
            </Link>

          </div>

          {latestAnalysis ? (
            <div className="latest-analysis-card">

              <div className="latest-analysis-info">

                <div className="latest-analysis-top">
                  <span className="latest-icon">🔬</span>

                  <div>
                    <h3>
                      {getStatus(latestAnalysis)}
                    </h3>

                    <p>
                      {latestAnalysis.fieldName ||
                        "Field not linked"}
                    </p>
                  </div>
                </div>

                <div className="latest-analysis-details">

                  <div>
                    <span>Condition</span>
                    <strong>
                      {getCondition(latestAnalysis)}
                    </strong>
                  </div>

                  <div>
                    <span>Confidence</span>
                    <strong>
                      {getConfidence(latestAnalysis)}
                    </strong>
                  </div>

                  <div>
                    <span>Analyzed On</span>
                    <strong>
                      {formatDate(
                        latestAnalysis.date ||
                          latestAnalysis.createdAt ||
                          latestAnalysis.timestamp
                      )}
                    </strong>
                  </div>

                </div>

                <div
                  className={`latest-status ${getStatusClass(
                    latestAnalysis
                  )}`}
                >
                  {getStatus(latestAnalysis)}
                </div>

              </div>

              {latestAnalysis.annotated_image ||
              latestAnalysis.preview ? (
                <div className="latest-analysis-image">
                  <img
                    src={
                      latestAnalysis.annotated_image ||
                      latestAnalysis.preview
                    }
                    alt="Latest crop analysis"
                  />
                </div>
              ) : (
                <div className="latest-analysis-placeholder">
                  🌾
                  <span>Crop image</span>
                </div>
              )}

            </div>
          ) : (
            <div className="dashboard-empty">

              <div className="empty-icon">🔍</div>

              <h3>No crop analysis yet</h3>

              <p>
                Upload a crop image and let the AI model analyze
                possible crop-health problems.
              </p>

              <Link to="/analyze">
                Analyze Your First Crop →
              </Link>

            </div>
          )}

        </section>

        {/* =========================
            MY FARM
        ========================= */}

        <section className="dashboard-section">

          <div className="dashboard-section-heading">

            <div>
              <h2>My Farm</h2>
              <p>Overview of your registered fields</p>
            </div>

            <Link to="/farm" className="dashboard-view-link">
              Manage Farm →
            </Link>

          </div>

          {fields.length > 0 ? (
            <div className="dashboard-fields-grid">

              {fields.slice(0, 4).map((field) => {

                const status =
                  field.latestCondition ||
                  field.status ||
                  "Not analyzed";

                const statusLower =
                  String(status).toLowerCase();

                let statusClass = "field-status-neutral";

                if (statusLower.includes("disease")) {
                  statusClass = "field-status-danger";
                } else if (statusLower.includes("insect")) {
                  statusClass = "field-status-warning";
                } else if (statusLower.includes("abiotic")) {
                  statusClass = "field-status-info";
                } else if (
                  statusLower.includes("healthy")
                ) {
                  statusClass = "field-status-success";
                }

                return (
                  <div
                    className="dashboard-field-card"
                    key={field.id}
                  >

                    <div className="field-card-icon">
                      🌱
                    </div>

                    <div className="field-card-content">

                      <h3>{field.name}</h3>

                      <p>
                        {field.crop || "Crop not specified"}
                      </p>

                      <span className="field-area">
                        {field.area || "Area not specified"}
                      </span>

                    </div>

                    <span
                      className={`field-status ${statusClass}`}
                    >
                      {status}
                    </span>

                  </div>
                );
              })}

            </div>
          ) : (
            <div className="dashboard-empty small-empty">

              <div className="empty-icon">🌱</div>

              <h3>No fields added yet</h3>

              <p>
                Add your first field to start monitoring your farm.
              </p>

              <Link to="/farm">
                Add Your First Field →
              </Link>

            </div>
          )}

        </section>

        {/* =========================
            AI MONITORING
        ========================= */}

        <section className="dashboard-section">

          <div className="dashboard-section-heading">

            <div>
              <h2>AI Monitoring</h2>
              <p>Detection classes supported by the current model</p>
            </div>

            <Link to="/insights" className="dashboard-view-link">
              View Insights →
            </Link>

          </div>

          <div className="ai-monitoring-grid">

            <div className="ai-class-card disease-card">
              <span className="ai-class-icon">🦠</span>
              <div>
                <h3>Disease</h3>
                <p>Possible disease detections</p>
                <strong>{statistics.disease}</strong>
              </div>
            </div>

            <div className="ai-class-card insect-card">
              <span className="ai-class-icon">🐛</span>
              <div>
                <h3>Insect</h3>
                <p>Possible insect detections</p>
                <strong>{statistics.insect}</strong>
              </div>
            </div>

            <div className="ai-class-card abiotic-card">
              <span className="ai-class-icon">🍂</span>
              <div>
                <h3>Abiotic</h3>
                <p>Possible abiotic stress</p>
                <strong>{statistics.abiotic}</strong>
              </div>
            </div>

          </div>

        </section>

        {/* =========================
            QUICK ACTIONS
        ========================= */}

        <section className="dashboard-quick-actions">

          <Link to="/analyze" className="quick-action primary-action">
            <span>🔍</span>
            <div>
              <h3>Analyze Crop</h3>
              <p>Upload a crop image for AI analysis</p>
            </div>
            <b>→</b>
          </Link>

          <Link to="/farm" className="quick-action">
            <span>🌾</span>
            <div>
              <h3>Manage My Farm</h3>
              <p>Add or manage your fields</p>
            </div>
            <b>→</b>
          </Link>

          <Link to="/history" className="quick-action">
            <span>📜</span>
            <div>
              <h3>Analysis History</h3>
              <p>Review previous crop inspections</p>
            </div>
            <b>→</b>
          </Link>

        </section>

      </main>
    </div>
  );
}

export default Dashboard;