import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Analyze.css";

function Analyze() {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [resultImage, setResultImage] = useState("");
  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedFields = JSON.parse(
      localStorage.getItem("precisionFarmingFields") || "[]"
    );

    setFields(savedFields);

    if (savedFields.length > 0) {
      setSelectedField(String(savedFields[0].id));
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    setSelectedFile(file);
    setResult(null);
    setResultImage("");
    setSavedMessage("");

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please drop an image file.");
      return;
    }

    setSelectedFile(file);
    setResult(null);
    setResultImage("");
    setSavedMessage("");

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleAnalyze = async () => {
    if (!selectedField) {
      alert("Please select a field first.");
      return;
    }

    if (!selectedFile) {
      alert("Please upload a crop image.");
      return;
    }

    setLoading(true);
    setResult(null);
    setResultImage("");
    setSavedMessage("");

    try {
      const formData = new FormData();

      formData.append("file", selectedFile);

      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Analysis failed.");
      }

      setResult(data);

      if (data.annotated_image) {
        setResultImage(data.annotated_image);
      }
    } catch (error) {
      console.error(error);
      alert(
        error.message ||
          "Unable to analyze the image. Please check the backend."
      );
    } finally {
      setLoading(false);
    }
  };

  const getPrimaryDetection = () => {
    if (!result?.detections || result.detections.length === 0) {
      return null;
    }

    return [...result.detections].sort(
      (a, b) => b.confidence - a.confidence
    )[0];
  };

  const primaryDetection = getPrimaryDetection();

  const getConditionClass = (condition = "") => {
    const value = condition.toLowerCase();

    if (value.includes("disease")) return "condition-danger";
    if (value.includes("insect")) return "condition-warning";
    if (value.includes("abiotic")) return "condition-orange";

    return "condition-good";
  };

  const getConditionIcon = (condition = "") => {
    const value = condition.toLowerCase();

    if (value.includes("disease")) return "🦠";
    if (value.includes("insect")) return "🐛";
    if (value.includes("abiotic")) return "🌤️";

    return "🌿";
  };

  const getFriendlyExplanation = () => {
    if (!primaryDetection) {
      return "No clear target was detected in this image. Try uploading a clearer crop image with the affected area visible.";
    }

    const condition = primaryDetection.class?.toLowerCase();

    if (condition === "disease") {
      return "The AI detected a possible disease-related pattern in the crop image. Check the affected area closely and continue monitoring the field.";
    }

    if (condition === "insect") {
      return "The AI detected an insect-related pattern. Inspect the affected plants and monitor whether the issue is spreading.";
    }

    if (condition === "abiotic") {
      return "The AI detected a possible abiotic stress pattern. Environmental conditions such as water, temperature, or light may need attention.";
    }

    return "The AI identified a crop-related pattern in the uploaded image.";
  };

  const saveAnalysis = () => {
    if (!result) return;

    const selectedFieldData = fields.find(
      (field) => String(field.id) === String(selectedField)
    );

    const condition =
      result.condition ||
      primaryDetection?.class ||
      "No clear detection";

    const confidence =
      result.confidence ||
      primaryDetection?.confidence ||
      0;

    const newAnalysis = {
      id: Date.now(),
      fieldId: selectedFieldData?.id,
      fieldName: selectedFieldData?.name || "Unknown Field",
      crop: selectedFieldData?.crop || "Crop",
      filename: selectedFile?.name || "crop-image",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      condition,
      confidence: Number(confidence),
      affectedArea: result.affected_area || "Detected area",
      detections: result.detections || [],
      image: resultImage || preview,
    };

    const oldHistory = JSON.parse(
      localStorage.getItem("precisionFarmingHistory") || "[]"
    );

    localStorage.setItem(
      "precisionFarmingHistory",
      JSON.stringify([newAnalysis, ...oldHistory])
    );

    const updatedFields = fields.map((field) => {
      if (String(field.id) !== String(selectedField)) {
        return field;
      }

      return {
        ...field,
        latestCondition: condition,
        latestConfidence: Number(confidence).toFixed(1),
        lastAnalyzed: new Date().toLocaleDateString(),
      };
    });

    setFields(updatedFields);

    localStorage.setItem(
      "precisionFarmingFields",
      JSON.stringify(updatedFields)
    );

    setSavedMessage("✓ Analysis saved successfully to History.");

    alert("✅ Analysis saved successfully to History!");
  };

  const resetAnalysis = () => {
    setSelectedFile(null);
    setPreview("");
    setResult(null);
    setResultImage("");
    setSavedMessage("");
  };

  return (
    <main className="analyze-page">
      {/* =========================
          HERO
      ========================= */}

      <section className="analyze-hero">
        <div className="analyze-hero-content">
          <div>
            <span className="analyze-eyebrow">
              ✦ AI CROP MONITORING
            </span>

            <h1>
              Understand Your
              <span> Crop Better.</span>
            </h1>

            <p>
              Upload a crop image and let our CNN + YOLO pipeline
              identify possible disease, insect activity, or
              abiotic stress.
            </p>

            <div className="analyze-hero-points">
              <span>✓ Image Analysis</span>
              <span>✓ AI Detection</span>
              <span>✓ Farmer-Friendly Results</span>
            </div>
          </div>

          <div className="analyze-hero-visual">
            <div className="ai-orbit orbit-a"></div>
            <div className="ai-orbit orbit-b"></div>

            <div className="ai-center">
              <span>🤖</span>
              <small>AI</small>
            </div>

            <div className="ai-float float-one">
              🌿
              <span>Crop</span>
            </div>

            <div className="ai-float float-two">
              🎯
              <span>Detect</span>
            </div>

            <div className="ai-float float-three">
              📊
              <span>Analyze</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          MAIN ANALYSIS
      ========================= */}

      <section className="analyze-container">
        <div className="analysis-top-heading">
          <div>
            <span className="section-mini-label">
              CROP ANALYSIS
            </span>

            <h2>Upload Crop Image</h2>

            <p>
              Select the field and upload a clear crop image for
              AI-based analysis.
            </p>
          </div>

          <div className="analysis-engine">
            <span className="engine-dot"></span>
            CNN + YOLO
          </div>
        </div>

        <div className="analysis-workspace">
          {/* LEFT */}
          <div className="upload-panel">
            <div className="panel-heading">
              <div>
                <span>STEP 01</span>
                <h3>Choose Your Field</h3>
              </div>

              <div className="step-number">01</div>
            </div>

            {fields.length === 0 ? (
              <div className="no-field-box">
                <span>🌾</span>

                <h4>No fields available</h4>

                <p>
                  Add a field before starting crop analysis.
                </p>

                <Link to="/farm">
                  Add Field →
                </Link>
              </div>
            ) : (
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="field-select"
              >
                <option value="">Select your field</option>

                {fields.map((field) => (
                  <option key={field.id} value={field.id}>
                    {field.name} — {field.crop}
                  </option>
                ))}
              </select>
            )}

            <div className="panel-heading upload-heading">
              <div>
                <span>STEP 02</span>
                <h3>Upload Crop Image</h3>
              </div>

              <div className="step-number">02</div>
            </div>

            <label
              className={`upload-zone ${
                preview ? "has-preview" : ""
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />

              {preview ? (
                <div className="preview-area">
                  <img src={preview} alt="Selected crop" />

                  <div className="preview-overlay">
                    <span>✓ Image Selected</span>
                    <small>
                      {selectedFile?.name}
                    </small>
                  </div>
                </div>
              ) : (
                <div className="upload-empty">
                  <div className="upload-icon">
                    📷
                  </div>

                  <h4>
                    Drop your crop image here
                  </h4>

                  <p>
                    or click to browse from your computer
                  </p>

                  <span className="upload-format">
                    JPG • PNG • JPEG
                  </span>
                </div>
              )}
            </label>

            <div className="upload-tip">
              <span>💡</span>
              <p>
                For better results, upload a clear image where
                the affected crop area is visible.
              </p>
            </div>

            <button
              className="analyze-button"
              onClick={handleAnalyze}
              disabled={
                loading ||
                !selectedFile ||
                !selectedField
              }
            >
              {loading ? (
                <>
                  <span className="button-spinner"></span>
                  AI is analyzing...
                </>
              ) : (
                <>
                  ✦ Analyze Crop
                  <span>→</span>
                </>
              )}
            </button>
          </div>

          {/* RIGHT */}
          <div className="result-panel">
            <div className="panel-heading">
              <div>
                <span>STEP 03</span>
                <h3>AI Analysis Result</h3>
              </div>

              <div className="step-number">03</div>
            </div>

            {!result && !loading && (
              <div className="result-empty">
                <div className="result-empty-icon">
                  <span>✦</span>
                </div>

                <h3>Your AI result will appear here</h3>

                <p>
                  Upload an image and click{" "}
                  <strong>Analyze Crop</strong> to see
                  detections, confidence, and crop insights.
                </p>

                <div className="result-process">
                  <div>
                    <span>01</span>
                    <small>Image</small>
                  </div>

                  <i>→</i>

                  <div>
                    <span>02</span>
                    <small>CNN</small>
                  </div>

                  <i>→</i>

                  <div>
                    <span>03</span>
                    <small>YOLO</small>
                  </div>

                  <i>→</i>

                  <div>
                    <span>04</span>
                    <small>Result</small>
                  </div>
                </div>
              </div>
            )}

            {loading && (
              <div className="scanning-state">
                <div className="scan-image">
                  {preview && (
                    <img
                      src={preview}
                      alt="Scanning crop"
                    />
                  )}

                  <div className="scan-line"></div>

                  <div className="scan-corner top-left"></div>
                  <div className="scan-corner top-right"></div>
                  <div className="scan-corner bottom-left"></div>
                  <div className="scan-corner bottom-right"></div>
                </div>

                <div className="scanning-text">
                  <span>AI PROCESSING</span>

                  <h3>
                    Analyzing your crop...
                  </h3>

                  <p>
                    CNN feature extraction and YOLO
                    object detection are running.
                  </p>
                </div>

                <div className="loading-steps">
                  <span className="done">
                    ✓ Preprocessing
                  </span>

                  <span className="active">
                    ◌ CNN Features
                  </span>

                  <span>
                    ○ YOLO Detection
                  </span>
                </div>
              </div>
            )}

            {result && !loading && (
              <div className="result-content">
                {resultImage && (
                  <div className="result-image-box">
                    <img
                      src={resultImage}
                      alt="AI annotated result"
                    />

                    <div className="result-image-label">
                      <span>●</span>
                      AI DETECTION VIEW
                    </div>
                  </div>
                )}

                <div className="result-main-card">
                  <div className="result-condition-icon">
                    {getConditionIcon(
                      result.condition ||
                        primaryDetection?.class
                    )}
                  </div>

                  <div className="result-condition-text">
                    <span>PRIMARY DETECTION</span>

                    <h3>
                      {result.condition ||
                        primaryDetection?.class ||
                        "No clear detection"}
                    </h3>

                    <p>
                      {getFriendlyExplanation()}
                    </p>
                  </div>

                  <div
                    className={`result-condition-status ${getConditionClass(
                      result.condition ||
                        primaryDetection?.class
                    )}`}
                  >
                    {primaryDetection
                      ? `${Number(
                          primaryDetection.confidence
                        ).toFixed(1)}%`
                      : "—"}
                  </div>
                </div>

                <div className="result-stats">
                  <div>
                    <span>AI Confidence</span>
                    <strong>
                      {primaryDetection
                        ? `${Number(
                            primaryDetection.confidence
                          ).toFixed(1)}%`
                        : "—"}
                    </strong>
                  </div>

                  <div>
                    <span>Affected Area</span>
                    <strong>
                      {result.affected_area || "Detected"}
                    </strong>
                  </div>

                  <div>
                    <span>Detections</span>
                    <strong>
                      {result.detections?.length || 0}
                    </strong>
                  </div>
                </div>

                {result.detections?.length > 0 && (
                  <div className="detection-section">
                    <div className="detection-heading">
                      <div>
                        <span>OBJECT DETECTION</span>
                        <h4>Detected Classes</h4>
                      </div>

                      <span>
                        {result.detections.length} found
                      </span>
                    </div>

                    <div className="detection-list">
                      {result.detections.map(
                        (detection, index) => (
                          <div
                            className="detection-item"
                            key={index}
                          >
                            <div className="detection-number">
                              {String(index + 1).padStart(
                                2,
                                "0"
                              )}
                            </div>

                            <div className="detection-info">
                              <strong>
                                {detection.class}
                              </strong>

                              <div className="confidence-track">
                                <div
                                  className="confidence-fill"
                                  style={{
                                    width: `${Math.min(
                                      Number(
                                        detection.confidence
                                      ),
                                      100
                                    )}%`,
                                  }}
                                ></div>
                              </div>
                            </div>

                            <span className="detection-confidence">
                              {Number(
                                detection.confidence
                              ).toFixed(1)}
                              %
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                <div className="result-note">
                  <span>✦</span>

                  <p>
                    AI predictions are decision-support
                    information. Continue field observation
                    before taking crop-management action.
                  </p>
                </div>

                {savedMessage && (
                  <div className="analyze-success">
                    {savedMessage}
                  </div>
                )}

                <div className="result-actions">
                  <button
                    className="save-result-button"
                    onClick={saveAnalysis}
                  >
                    ✓ Save Analysis
                  </button>

                  <button
                    className="new-analysis-button"
                    onClick={resetAnalysis}
                  >
                    + New Analysis
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================
          HOW ANALYSIS WORKS
      ========================= */}

      <section className="analysis-method-section">
        <div className="method-heading">
          <span className="section-mini-label">
            HOW YOUR IMAGE IS PROCESSED
          </span>

          <h2>From Crop Image to AI Insight</h2>

          <p>
            A simple four-stage pipeline converts your crop image
            into an easy-to-understand result.
          </p>
        </div>

        <div className="method-flow">
          <div className="method-card">
            <div className="method-number">01</div>
            <div className="method-icon">📷</div>
            <h3>Upload</h3>
            <p>
              Provide a clear image of the crop.
            </p>
          </div>

          <div className="method-arrow">→</div>

          <div className="method-card">
            <div className="method-number">02</div>
            <div className="method-icon">⚙️</div>
            <h3>Preprocess</h3>
            <p>
              OpenCV prepares the image for AI.
            </p>
          </div>

          <div className="method-arrow">→</div>

          <div className="method-card">
            <div className="method-number">03</div>
            <div className="method-icon">🧠</div>
            <h3>Detect</h3>
            <p>
              CNN + YOLO identify visual patterns.
            </p>
          </div>

          <div className="method-arrow">→</div>

          <div className="method-card">
            <div className="method-number">04</div>
            <div className="method-icon">🌾</div>
            <h3>Understand</h3>
            <p>
              Results are shown in farmer-friendly language.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Analyze;