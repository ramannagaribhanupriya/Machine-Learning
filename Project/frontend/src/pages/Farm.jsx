import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Farm.css";

function Farm() {
  const [fields, setFields] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [newField, setNewField] = useState({
    name: "",
    crop: "",
    area: "",
  });

  useEffect(() => {
    const savedFields = JSON.parse(
      localStorage.getItem("precisionFarmingFields") || "[]"
    );

    setFields(savedFields);
  }, []);

  const saveFields = (updatedFields) => {
    setFields(updatedFields);
    localStorage.setItem(
      "precisionFarmingFields",
      JSON.stringify(updatedFields)
    );
  };

  const handleChange = (e) => {
    setNewField({
      ...newField,
      [e.target.name]: e.target.value,
    });
  };

  const addField = (e) => {
    e.preventDefault();

    if (!newField.name || !newField.crop || !newField.area) {
      alert("Please fill all field details.");
      return;
    }

    const field = {
      id: Date.now(),
      name: newField.name,
      crop: newField.crop,
      area: newField.area,
      status: "Not analyzed",
      createdAt: new Date().toISOString(),
    };

    saveFields([...fields, field]);

    setNewField({
      name: "",
      crop: "",
      area: "",
    });

    setShowForm(false);

    alert("🌱 New field added successfully!");
  };

  const deleteField = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this field?"
    );

    if (!confirmDelete) return;

    const updatedFields = fields.filter((field) => field.id !== id);
    saveFields(updatedFields);
  };

  const getFieldStatus = (field) => {
    if (!field.latestCondition) {
      return {
        text: "Not analyzed",
        className: "status-neutral",
      };
    }

    const condition = field.latestCondition.toLowerCase();

    if (condition.includes("disease")) {
      return {
        text: "Disease detected",
        className: "status-danger",
      };
    }

    if (condition.includes("insect")) {
      return {
        text: "Insect detected",
        className: "status-warning",
      };
    }

    if (condition.includes("abiotic")) {
      return {
        text: "Abiotic stress",
        className: "status-warning",
      };
    }

    return {
      text: "Healthy / Clear",
      className: "status-good",
    };
  };

  const totalArea = useMemo(() => {
    return fields.reduce((sum, field) => {
      const area = parseFloat(field.area);
      return sum + (isNaN(area) ? 0 : area);
    }, 0);
  }, [fields]);

  const analyzedFields = fields.filter(
    (field) => field.latestCondition
  ).length;

  const fieldsWithIssues = fields.filter((field) => {
    const condition = field.latestCondition?.toLowerCase() || "";

    return (
      condition.includes("disease") ||
      condition.includes("insect") ||
      condition.includes("abiotic")
    );
  }).length;

  return (
    <main className="farm-page">
      {/* HERO */}
      <section className="farm-hero">
        <div className="farm-hero-content">
          <div className="farm-hero-text">
            <span className="farm-eyebrow">
              🌱 YOUR DIGITAL FARM
            </span>

            <h1>
              Manage Your
              <span> Fields Smarter.</span>
            </h1>

            <p>
              Keep your fields organized, monitor crop conditions,
              and use AI-powered analysis to understand what is
              happening in your crops.
            </p>

            <div className="farm-hero-actions">
              <button
                className="add-field-main"
                onClick={() => setShowForm(true)}
              >
                <span>＋</span>
                Add New Field
              </button>

              <Link to="/analyze" className="analyze-main-link">
                Analyze Crop →
              </Link>
            </div>
          </div>

          <div className="farm-hero-visual">
            <div className="farm-circle farm-circle-one"></div>
            <div className="farm-circle farm-circle-two"></div>

            <div className="farm-field-visual">
              <div className="visual-sun">☀️</div>
              <div className="visual-cloud cloud-one">☁</div>
              <div className="visual-cloud cloud-two">☁</div>

              <div className="visual-land">
                <div className="crop-row row-one">
                  🌱 🌱 🌱 🌱
                </div>
                <div className="crop-row row-two">
                  🌿 🌿 🌿 🌿
                </div>
                <div className="crop-row row-three">
                  🌱 🌱 🌱 🌱
                </div>
              </div>

              <div className="visual-ai-badge">
                <span>✦</span>
                AI Monitoring
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUMMARY */}
      <section className="farm-summary">
        <div className="farm-stat-card">
          <div className="farm-stat-icon green">🌾</div>
          <div>
            <span>Total Fields</span>
            <strong>{fields.length}</strong>
          </div>
        </div>

        <div className="farm-stat-card">
          <div className="farm-stat-icon blue">📐</div>
          <div>
            <span>Total Area</span>
            <strong>{totalArea.toFixed(1)} acres</strong>
          </div>
        </div>

        <div className="farm-stat-card">
          <div className="farm-stat-icon purple">🤖</div>
          <div>
            <span>AI Monitored</span>
            <strong>{analyzedFields}</strong>
          </div>
        </div>

        <div className="farm-stat-card">
          <div className="farm-stat-icon orange">⚠️</div>
          <div>
            <span>Needs Attention</span>
            <strong>{fieldsWithIssues}</strong>
          </div>
        </div>
      </section>

      {/* ADD FIELD */}
      {showForm && (
        <section className="add-field-section">
          <div className="add-field-header">
            <div>
              <span className="section-mini-label">
                FIELD SETUP
              </span>
              <h2>Add a New Field</h2>
              <p>
                Add your field details so you can monitor it through
                Precision Farming.
              </p>
            </div>

            <button
              className="close-form"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>
          </div>

          <form onSubmit={addField} className="field-form">
            <div className="form-group">
              <label>Field Name</label>
              <input
                type="text"
                name="name"
                value={newField.name}
                onChange={handleChange}
                placeholder="Example: North Field"
              />
            </div>

            <div className="form-group">
              <label>Crop</label>
              <input
                type="text"
                name="crop"
                value={newField.crop}
                onChange={handleChange}
                placeholder="Example: Cashew"
              />
            </div>

            <div className="form-group">
              <label>Area</label>
              <div className="area-input">
                <input
                  type="number"
                  name="area"
                  value={newField.area}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  step="0.1"
                />
                <span>acres</span>
              </div>
            </div>

            <button type="submit" className="save-field-button">
              Save Field
            </button>
          </form>
        </section>
      )}

      {/* FIELD SECTION */}
      <section className="fields-section">
        <div className="section-heading-row">
          <div>
            <span className="section-mini-label">
              FIELD MONITORING
            </span>

            <h2>My Fields</h2>

            <p>
              View your fields and their latest AI analysis.
            </p>
          </div>

          {!showForm && (
            <button
              className="add-field-small"
              onClick={() => setShowForm(true)}
            >
              ＋ Add Field
            </button>
          )}
        </div>

        {fields.length === 0 ? (
          <div className="farm-empty-state">
            <div className="empty-illustration">
              🌱
            </div>

            <h3>No fields added yet</h3>

            <p>
              Add your first field to start tracking crop health
              with AI-powered analysis.
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="empty-add-button"
            >
              Add My First Field →
            </button>
          </div>
        ) : (
          <div className="field-grid">
            {fields.map((field) => {
              const status = getFieldStatus(field);

              return (
                <article className="field-card" key={field.id}>
                  <div className="field-card-top">
                    <div className="field-icon">
                      🌾
                    </div>

                    <button
                      className="delete-field"
                      onClick={() => deleteField(field.id)}
                      title="Delete field"
                    >
                      ⋮
                    </button>
                  </div>

                  <div className="field-title">
                    <span>FIELD</span>
                    <h3>{field.name}</h3>
                  </div>

                  <div className="field-details">
                    <div>
                      <span>Crop</span>
                      <strong>{field.crop}</strong>
                    </div>

                    <div>
                      <span>Area</span>
                      <strong>{field.area} acres</strong>
                    </div>
                  </div>

                  <div className="field-status-box">
                    <div className="field-status-heading">
                      <span>Latest AI Status</span>

                      <span
                        className={`field-status ${status.className}`}
                      >
                        <i></i>
                        {status.text}
                      </span>
                    </div>

                    {field.latestCondition ? (
                      <div className="field-ai-details">
                        <div>
                          <span>Detection</span>
                          <strong>
                            {field.latestCondition}
                          </strong>
                        </div>

                        {field.latestConfidence && (
                          <div>
                            <span>Confidence</span>
                            <strong>
                              {field.latestConfidence}%
                            </strong>
                          </div>
                        )}

                        {field.lastAnalyzed && (
                          <small>
                            Last analyzed: {field.lastAnalyzed}
                          </small>
                        )}
                      </div>
                    ) : (
                      <p className="not-analyzed-text">
                        This field has not been analyzed yet.
                      </p>
                    )}
                  </div>

                  <div className="field-card-actions">
                    <Link
                      to="/analyze"
                      className="field-analyze-button"
                    >
                      Analyze This Field
                      <span>→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* BOTTOM INFO */}
      <section className="farm-info-section">
        <div className="farm-info-icon">
          ✦
        </div>

        <div>
          <span>SMART CROP MONITORING</span>

          <h2>
            One place for all your field information.
          </h2>

          <p>
            Add your fields once and use AI crop analysis to
            monitor possible disease, insect activity, and
            abiotic stress over time.
          </p>
        </div>

        <Link to="/how-it-works">
          Learn How It Works →
        </Link>
      </section>
    </main>
  );
}

export default Farm;