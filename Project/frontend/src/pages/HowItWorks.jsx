import { Link } from "react-router-dom";
import "./HowItWorks.css";

function HowItWorks() {
  return (
    <main className="how-page">
      {/* HERO */}
      <section className="how-hero">
        <div className="how-hero-content">
          <span className="how-tag">⚙️ HOW IT WORKS</span>

          <h1>
            From Crop Image
            <span>to AI Insight</span>
          </h1>

          <p>
            Our system uses image processing, CNN feature extraction and YOLO
            object detection to identify possible crop-health problems.
          </p>

          <Link to="/analyze" className="how-primary-button">
            Analyze My Crop →
          </Link>
        </div>

        <div className="how-visual">
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>

          <div className="orbit-node node-image">
            <span>📷</span>
            <small>Crop Image</small>
          </div>

          <div className="orbit-node node-cnn">
            <span>🧠</span>
            <small>CNN</small>
          </div>

          <div className="orbit-node node-yolo">
            <span>🎯</span>
            <small>YOLO</small>
          </div>

          <div className="orbit-center">
            <span>🌾</span>
            <strong>AI</strong>
          </div>
        </div>
      </section>

      {/* MAIN FLOW */}
      <section className="process-section">
        <div className="section-title">
          <span>THE PROCESS</span>
          <h2>How your crop image is analyzed</h2>
          <p>
            The complete pipeline converts a crop image into an easy-to-
            understand AI result.
          </p>
        </div>

        <div className="process-flow">
          <div className="process-card">
            <div className="process-number">01</div>
            <div className="process-icon">📷</div>
            <h3>Crop Image</h3>
            <p>
              Upload a crop image from your device for analysis.
            </p>
          </div>

          <div className="flow-arrow">→</div>

          <div className="process-card">
            <div className="process-number">02</div>
            <div className="process-icon">🔍</div>
            <h3>OpenCV</h3>
            <p>
              The image is prepared and processed before model prediction.
            </p>
          </div>

          <div className="flow-arrow">→</div>

          <div className="process-card">
            <div className="process-number">03</div>
            <div className="process-icon">🧠</div>
            <h3>CNN</h3>
            <p>
              CNN-based feature extraction helps the model understand visual
              patterns.
            </p>
          </div>

          <div className="flow-arrow">→</div>

          <div className="process-card">
            <div className="process-number">04</div>
            <div className="process-icon">🎯</div>
            <h3>YOLO</h3>
            <p>
              YOLO detects objects and identifies their locations in the
              image.
            </p>
          </div>
        </div>
      </section>

      {/* DETECTION */}
      <section className="detection-section">
        <div className="detection-content">
          <span className="section-label">AI DETECTION</span>

          <h2>
            What does the model
            <span>look for?</span>
          </h2>

          <p>
            The current CADI-AI based model is trained to detect three main
            agricultural categories in the project dataset.
          </p>

          <div className="detection-list">
            <div className="detection-item">
              <div className="detection-item-icon disease-icon">🦠</div>

              <div>
                <h3>Disease</h3>
                <p>
                  Visual patterns associated with disease conditions.
                </p>
              </div>
            </div>

            <div className="detection-item">
              <div className="detection-item-icon insect-icon">🐛</div>

              <div>
                <h3>Insect</h3>
                <p>
                  Visible insect-related patterns found in the image.
                </p>
              </div>
            </div>

            <div className="detection-item">
              <div className="detection-item-icon abiotic-icon">🌿</div>

              <div>
                <h3>Abiotic</h3>
                <p>
                  Visual patterns associated with abiotic crop stress.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="detection-preview">
          <div className="preview-window">
            <div className="preview-topbar">
              <span></span>
              <span></span>
              <span></span>
              <small>AI Crop Analysis</small>
            </div>

            <div className="preview-image">
              <div className="crop-placeholder">
                🌿
              </div>

              <div className="bounding-box box-one">
                <span>Disease 92%</span>
              </div>

              <div className="bounding-box box-two">
                <span>Insect 84%</span>
              </div>

              <div className="scan-line"></div>
            </div>

            <div className="preview-result">
              <div>
                <span>Primary Detection</span>
                <strong>Disease</strong>
              </div>

              <div>
                <span>Confidence</span>
                <strong>92%</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULT EXPLANATION */}
      <section className="result-section">
        <div className="section-title">
          <span>UNDERSTANDING THE RESULT</span>
          <h2>What happens after detection?</h2>
          <p>
            The system converts technical model output into information that
            is easier for a farmer to understand.
          </p>
        </div>

        <div className="result-grid">
          <div className="result-card">
            <div className="result-card-icon">📦</div>
            <h3>Bounding Boxes</h3>
            <p>
              The detected areas are highlighted directly on the crop image.
            </p>
          </div>

          <div className="result-card">
            <div className="result-card-icon">📈</div>
            <h3>Confidence</h3>
            <p>
              A confidence value shows how strongly the model matched a
              detected class.
            </p>
          </div>

          <div className="result-card">
            <div className="result-card-icon">💡</div>
            <h3>Simple Explanation</h3>
            <p>
              The technical prediction is presented in a simple,
              farmer-friendly format.
            </p>
          </div>

          <div className="result-card">
            <div className="result-card-icon">🗂️</div>
            <h3>History</h3>
            <p>
              Completed analyses can be saved so crop conditions can be
              monitored over time.
            </p>
          </div>
        </div>
      </section>

      {/* SIMPLE FLOW */}
      <section className="simple-flow-section">
        <div className="simple-flow-card">
          <span className="section-label">IN ONE SIMPLE FLOW</span>

          <div className="simple-flow">
            <div>
              <span>📷</span>
              <strong>Upload</strong>
            </div>

            <b>→</b>

            <div>
              <span>🔍</span>
              <strong>Process</strong>
            </div>

            <b>→</b>

            <div>
              <span>🧠</span>
              <strong>Analyze</strong>
            </div>

            <b>→</b>

            <div>
              <span>🎯</span>
              <strong>Detect</strong>
            </div>

            <b>→</b>

            <div>
              <span>🌾</span>
              <strong>Understand</strong>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="how-cta">
        <div>
          <span>🌱 READY TO CHECK A CROP?</span>

          <h2>
            Upload an image and
            <br />
            let the AI analyze it.
          </h2>
        </div>

        <Link to="/analyze" className="how-cta-button">
          Start Crop Analysis →
        </Link>
      </section>
    </main>
  );
}

export default HowItWorks;