import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./History.css";

function History() {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const savedHistory = JSON.parse(
      localStorage.getItem("precisionFarmingHistory") || "[]"
    );

    setHistory(savedHistory);
  };

  const getCondition = (item) => {
    if (item.condition) {
      return item.condition;
    }

    if (item.detections?.length > 0) {
      return item.detections[0]?.class || "Unknown";
    }

    return "No Detection";
  };

  const getConditionLower = (item) => {
    return getCondition(item).toLowerCase();
  };

  const getStatus = (item) => {
    const condition = getConditionLower(item);

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

  const getStatusClass = (item) => {
    const status = getStatus(item).toLowerCase();

    if (status === "disease") {
      return "disease";
    }

    if (status === "insect") {
      return "insect";
    }

    if (status === "abiotic") {
      return "abiotic";
    }

    if (status === "healthy") {
      return "healthy";
    }

    return "neutral";
  };

  const getStatusIcon = (item) => {
    const status = getStatus(item);

    if (status === "Disease") {
      return "🦠";
    }

    if (status === "Insect") {
      return "🐛";
    }

    if (status === "Abiotic") {
      return "🌿";
    }

    if (status === "Healthy") {
      return "✓";
    }

    return "🔍";
  };

  const getConfidence = (item) => {
    const value = Number(item.confidence);

    if (Number.isNaN(value)) {
      return null;
    }

    return value;
  };

  const formatDate = (item) => {
    const value =
      item.createdAt ||
      item.timestamp ||
      item.date;

    if (!value) {
      return "Date unavailable";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Date unavailable";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (item) => {
    const value =
      item.createdAt ||
      item.timestamp ||
      item.date;

    if (!value) {
      return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const condition = getCondition(item).toLowerCase();

      const fieldName = (
        item.fieldName || ""
      ).toLowerCase();

      const crop = (
        item.crop || ""
      ).toLowerCase();

      const filename = (
        item.filename || ""
      ).toLowerCase();

      const searchText = search.toLowerCase();

      const matchesSearch =
        condition.includes(searchText) ||
        fieldName.includes(searchText) ||
        crop.includes(searchText) ||
        filename.includes(searchText);

      const matchesFilter =
        filter === "All" ||
        condition.includes(filter.toLowerCase());

      return matchesSearch && matchesFilter;
    });
  }, [history, filter, search]);

  const diseaseCount = history.filter(
    (item) => getStatus(item) === "Disease"
  ).length;

  const insectCount = history.filter(
    (item) => getStatus(item) === "Insect"
  ).length;

  const abioticCount = history.filter(
    (item) => getStatus(item) === "Abiotic"
  ).length;

  const clearHistory = () => {
    if (history.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to clear all analysis history?"
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem(
      "precisionFarmingHistory"
    );

    setHistory([]);
  };

  return (
    <main className="history-page">

      {/* HERO */}

      <section className="history-hero">

        <div className="history-hero-content">

          <div className="history-label">
            <span>◈</span>
            AI MONITORING
          </div>

          <h1>
            Your Crop
            <span> Analysis History</span>
          </h1>

          <p>
            Track previous crop scans, AI detections,
            confidence levels and field conditions
            in one place.
          </p>

        </div>

        <Link
          to="/analyze"
          className="history-analyze-button"
        >
          <span>＋</span>
          Analyze New Crop
        </Link>

      </section>


      {/* OVERVIEW */}

      <section className="history-overview">

        <div className="overview-title">
          <h2>Monitoring Overview</h2>
          <p>Your crop analysis activity at a glance.</p>
        </div>

        <div className="history-stat-grid">

          <div className="history-stat total">
            <div className="stat-icon">⌁</div>

            <div>
              <span>Total Scans</span>
              <strong>{history.length}</strong>
            </div>
          </div>


          <div className="history-stat disease">
            <div className="stat-icon">◉</div>

            <div>
              <span>Disease</span>
              <strong>{diseaseCount}</strong>
            </div>
          </div>


          <div className="history-stat insect">
            <div className="stat-icon">◈</div>

            <div>
              <span>Insects</span>
              <strong>{insectCount}</strong>
            </div>
          </div>


          <div className="history-stat abiotic">
            <div className="stat-icon">✦</div>

            <div>
              <span>Abiotic Stress</span>
              <strong>{abioticCount}</strong>
            </div>
          </div>

        </div>

      </section>


      {/* TOOLBAR */}

      <section className="history-toolbar">

        <div className="history-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search field, crop or detection..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <div className="history-filter-group">

          {[
            "All",
            "Disease",
            "Insect",
            "Abiotic",
          ].map((item) => (

            <button
              key={item}
              className={
                filter === item
                  ? "history-filter active"
                  : "history-filter"
              }
              onClick={() =>
                setFilter(item)
              }
            >
              {item}
            </button>

          ))}

        </div>


        {history.length > 0 && (

          <button
            className="history-clear"
            onClick={clearHistory}
          >
            Clear
          </button>

        )}

      </section>


      {/* RESULTS HEADER */}

      {filteredHistory.length > 0 && (

        <div className="history-results-header">

          <div>
            <h2>Recent Analyses</h2>

            <p>
              Showing {filteredHistory.length}{" "}
              {filteredHistory.length === 1
                ? "analysis"
                : "analyses"}
            </p>
          </div>

        </div>

      )}


      {/* EMPTY */}

      {filteredHistory.length === 0 ? (

        <section className="history-empty">

          <div className="empty-illustration">
            <div className="empty-circle">
              🌱
            </div>
          </div>

          <h2>
            {history.length === 0
              ? "No crop analyses yet"
              : "No matching analyses"}
          </h2>

          <p>
            {history.length === 0
              ? "Analyze a crop image and save the result to build your monitoring history."
              : "Try another search term or choose a different filter."}
          </p>

          {history.length === 0 && (

            <Link
              to="/analyze"
              className="empty-action"
            >
              Start Crop Analysis
              <span>→</span>
            </Link>

          )}

        </section>

      ) : (

        <section className="history-timeline">

          {filteredHistory.map((item, index) => {

            const status = getStatus(item);
            const statusClass =
              getStatusClass(item);

            const confidence =
              getConfidence(item);

            const image =
              item.annotated_image ||
              item.preview ||
              item.image ||
              null;

            const detections =
              Array.isArray(item.detections)
                ? item.detections
                : [];

            return (

              <article
                className="history-entry"
                key={
                  item.id ||
                  item.createdAt ||
                  `${item.filename}-${index}`
                }
              >

                {/* TIMELINE */}

                <div className="timeline-line">

                  <div
                    className={`timeline-dot ${statusClass}`}
                  >
                    {getStatusIcon(item)}
                  </div>

                </div>


                {/* MAIN CARD */}

                <div className="history-analysis-card">

                  {/* IMAGE */}

                  <div className="analysis-image">

                    {image ? (

                      <img
                        src={image}
                        alt="Analyzed crop"
                      />

                    ) : (

                      <div className="image-placeholder">
                        🌿
                        <span>
                          Image unavailable
                        </span>
                      </div>

                    )}

                    <div
                      className={`image-status ${statusClass}`}
                    >
                      {getStatusIcon(item)}
                      {status}
                    </div>

                  </div>


                  {/* CONTENT */}

                  <div className="analysis-content">

                    <div className="analysis-header">

                      <div>

                        <div className="analysis-date">
                          {formatDate(item)}
                          <span>
                            {formatTime(item)}
                          </span>
                        </div>

                        <h3>
                          {item.fieldName ||
                            "Unassigned Field"}
                        </h3>

                      </div>

                      <div className="analysis-number">
                        #{String(
                          history.length - index
                        ).padStart(2, "0")}
                      </div>

                    </div>


                    {/* FIELD */}

                    <div className="analysis-meta">

                      <span>
                        🌾{" "}
                        {item.crop ||
                          "Crop not specified"}
                      </span>

                      <span>
                        📷{" "}
                        {item.filename ||
                          "Crop image"}
                      </span>

                    </div>


                    {/* AI RESULT */}

                    <div className="ai-result">

                      <div className="result-main">

                        <span className="result-label">
                          AI DETECTION
                        </span>

                        <strong
                          className={`result-condition ${statusClass}`}
                        >
                          {getStatusIcon(item)}
                          {status}
                        </strong>

                      </div>


                      {confidence !== null && (

                        <div className="confidence-area">

                          <div className="confidence-top">

                            <span>
                              Confidence
                            </span>

                            <strong>
                              {confidence.toFixed(1)}%
                            </strong>

                          </div>

                          <div className="confidence-bar">

                            <div
                              className={`confidence-fill ${statusClass}`}
                              style={{
                                width: `${Math.min(
                                  confidence,
                                  100
                                )}%`,
                              }}
                            />

                          </div>

                        </div>

                      )}

                    </div>


                    {/* DETECTIONS */}

                    {detections.length > 0 && (

                      <div className="detection-section">

                        <span>
                          DETECTIONS
                        </span>

                        <div className="detection-pills">

                          {detections
                            .slice(0, 5)
                            .map(
                              (
                                detection,
                                detectionIndex
                              ) => (

                                <span
                                  key={
                                    detectionIndex
                                  }
                                >
                                  {detection.class ||
                                    "Unknown"}

                                  {detection.confidence !==
                                    undefined && (
                                    <>
                                      {" "}
                                      ·{" "}
                                      {Number(
                                        detection.confidence
                                      ).toFixed(0)}
                                      %
                                    </>
                                  )}
                                </span>

                              )
                            )}

                        </div>

                      </div>

                    )}


                    {/* FOOTER */}

                    <div className="analysis-footer">

                      <span>
                        📍{" "}
                        {item.fieldName
                          ? `Analysis from ${item.fieldName}`
                          : "Field not linked"}
                      </span>

                      <span>
                        AI Model: CNN + YOLO
                      </span>

                    </div>

                  </div>

                </div>

              </article>

            );
          })}

        </section>

      )}


      {/* FOOT NOTE */}

      <div className="history-footer-note">

        <div className="note-icon">
          ✦
        </div>

        <div>

          <strong>
            AI-assisted crop monitoring
          </strong>

          <p>
            These results are generated from crop
            images using the project's CNN + YOLO
            detection pipeline. They are intended
            to support crop monitoring and decision
            making.
          </p>

        </div>

      </div>

    </main>
  );
}

export default History;