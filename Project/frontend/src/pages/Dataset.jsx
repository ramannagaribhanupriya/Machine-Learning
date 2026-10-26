import { Link } from "react-router-dom";
import "./Dataset.css";

function Dataset() {
  return (
    <main className="dataset-page">
      {/* HERO */}
      <section className="dataset-hero">
        <div className="dataset-hero-content">
          <div className="dataset-hero-text">
            <span className="dataset-eyebrow">
              🧠 MACHINE LEARNING DATASET
            </span>

            <h1>
              The Data Behind
              <span> Our AI Model.</span>
            </h1>

            <p>
              Precision Farming uses the CADI-AI agricultural
              dataset to train and evaluate YOLO-based crop
              object detection for cashew crop health analysis.
            </p>

            <div className="dataset-hero-actions">
              <a
                href="https://huggingface.co/datasets/KaraAgro-AI/CADI-AI"
                target="_blank"
                rel="noreferrer"
                className="dataset-primary-button"
              >
                View Dataset ↗
              </a>

              <Link
                to="/how-it-works"
                className="dataset-secondary-button"
              >
                How AI Works →
              </Link>
            </div>
          </div>

          <div className="dataset-hero-visual">
            <div className="dataset-orbit orbit-one"></div>
            <div className="dataset-orbit orbit-two"></div>

            <div className="dataset-center">
              <span>🗂️</span>
              <strong>CADI-AI</strong>
              <small>Dataset</small>
            </div>

            <div className="dataset-floating floating-one">
              <strong>03</strong>
              <span>Classes</span>
            </div>

            <div className="dataset-floating floating-two">
              <strong>YOLO</strong>
              <span>Annotations</span>
            </div>

            <div className="dataset-floating floating-three">
              <strong>AI</strong>
              <span>Detection</span>
            </div>
          </div>
        </div>
      </section>

      {/* DATASET OVERVIEW */}
      <section className="dataset-container">
        <div className="dataset-section-heading">
          <div>
            <span className="dataset-mini-label">
              DATASET OVERVIEW
            </span>

            <h2>CADI-AI</h2>

            <p>
              Cashew Disease Identification with AI — used for
              agricultural object detection.
            </p>
          </div>

          <div className="dataset-source-badge">
            <span></span>
            Hugging Face Dataset
          </div>
        </div>

        <div className="dataset-overview-grid">
          <div className="dataset-overview-card main-card">
            <div className="overview-icon">🌿</div>

            <span>DATASET PURPOSE</span>

            <h3>
              Identifying crop-health related objects
            </h3>

            <p>
              The dataset provides agricultural images with
              object-detection annotations. These annotations
              allow the model to learn where relevant visual
              patterns appear in crop images.
            </p>

            <div className="overview-tags">
              <span>Computer Vision</span>
              <span>Object Detection</span>
              <span>Agriculture</span>
            </div>
          </div>

          <div className="dataset-overview-card">
            <div className="overview-icon small">🏷️</div>

            <span>ANNOTATION TYPE</span>

            <h3>YOLO Format</h3>

            <p>
              Each annotated object contains its class and
              bounding-box information.
            </p>

            <div className="annotation-example">
              <span>class</span>
              <span>x-center</span>
              <span>y-center</span>
              <span>width</span>
              <span>height</span>
            </div>
          </div>

          <div className="dataset-overview-card">
            <div className="overview-icon small">📊</div>

            <span>DATA SPLIT</span>

            <h3>Train • Validation • Test</h3>

            <p>
              The dataset workflow separates images for model
              learning, validation, and final evaluation.
            </p>

            <div className="split-bars">
              <div className="split-row">
                <span>Train</span>
                <i className="train-bar"></i>
              </div>

              <div className="split-row">
                <span>Validation</span>
                <i className="validation-bar"></i>
              </div>

              <div className="split-row">
                <span>Test</span>
                <i className="test-bar"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLASSES */}
      <section className="classes-section">
        <div className="dataset-section-heading centered">
          <div>
            <span className="dataset-mini-label">
              DETECTION CLASSES
            </span>

            <h2>What Can The Model Detect?</h2>

            <p>
              The current CADI-AI model is configured for three
              agricultural detection classes.
            </p>
          </div>
        </div>

        <div className="classes-grid">
          <article className="class-card disease-card">
            <div className="class-card-top">
              <div className="class-big-icon">
                🦠
              </div>

              <span>CLASS 01</span>
            </div>

            <h3>Disease</h3>

            <p>
              Detects visual patterns associated with
              disease-related crop conditions in the dataset.
            </p>

            <div className="class-footer">
              <span>YOLO Class ID</span>
              <strong>1</strong>
            </div>
          </article>

          <article className="class-card insect-card">
            <div className="class-card-top">
              <div className="class-big-icon">
                🐛
              </div>

              <span>CLASS 02</span>
            </div>

            <h3>Insect</h3>

            <p>
              Detects insect-related objects appearing in the
              agricultural images.
            </p>

            <div className="class-footer">
              <span>YOLO Class ID</span>
              <strong>2</strong>
            </div>
          </article>

          <article className="class-card abiotic-card">
            <div className="class-card-top">
              <div className="class-big-icon">
                🌤️
              </div>

              <span>CLASS 03</span>
            </div>

            <h3>Abiotic</h3>

            <p>
              Represents abiotic stress-related visual patterns
              included in the dataset.
            </p>

            <div className="class-footer">
              <span>YOLO Class ID</span>
              <strong>0</strong>
            </div>
          </article>
        </div>
      </section>

      {/* PIPELINE */}
      <section className="dataset-pipeline">
        <div className="pipeline-heading">
          <span className="dataset-mini-label">
            DATA PREPARATION
          </span>

          <h2>From Dataset to AI Model</h2>

          <p>
            The dataset passes through several stages before
            producing crop-health predictions.
          </p>
        </div>

        <div className="pipeline-flow">
          <div className="pipeline-card">
            <span>01</span>
            <div>🗂️</div>
            <h3>Dataset</h3>
            <p>Collect agricultural images.</p>
          </div>

          <i>→</i>

          <div className="pipeline-card">
            <span>02</span>
            <div>✂️</div>
            <h3>Preprocess</h3>
            <p>Prepare images for analysis.</p>
          </div>

          <i>→</i>

          <div className="pipeline-card">
            <span>03</span>
            <div>🏷️</div>
            <h3>Annotate</h3>
            <p>Use YOLO bounding boxes.</p>
          </div>

          <i>→</i>

          <div className="pipeline-card">
            <span>04</span>
            <div>🧠</div>
            <h3>Train</h3>
            <p>Train the detection model.</p>
          </div>

          <i>→</i>

          <div className="pipeline-card">
            <span>05</span>
            <div>🎯</div>
            <h3>Predict</h3>
            <p>Detect objects in new images.</p>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="dataset-tech-section">
        <div>
          <span className="dataset-mini-label">
            PROJECT TECHNOLOGY
          </span>

          <h2>Tools Used In The AI Pipeline</h2>

          <p>
            The project combines Python-based computer vision
            tools with deep-learning object detection.
          </p>
        </div>

        <div className="technology-list">
          <div>
            <span>🐍</span>
            <strong>Python</strong>
            <small>Model development</small>
          </div>

          <div>
            <span>🧠</span>
            <strong>YOLO</strong>
            <small>Object detection</small>
          </div>

          <div>
            <span>👁️</span>
            <strong>OpenCV</strong>
            <small>Image processing</small>
          </div>

          <div>
            <span>🔢</span>
            <strong>NumPy</strong>
            <small>Numerical operations</small>
          </div>

          <div>
            <span>📈</span>
            <strong>Matplotlib</strong>
            <small>Visualization</small>
          </div>
        </div>
      </section>

      {/* NOTE */}
      <section className="dataset-note">
        <div className="dataset-note-icon">
          ℹ
        </div>

        <div>
          <h3>Important Dataset Note</h3>

          <p>
            CADI-AI is a cashew-focused agricultural dataset.
            Therefore, the current trained model should not be
            presented as a universal detector for every crop.
            Predictions are based on the classes represented in
            the dataset and should be treated as AI-assisted
            decision support.
          </p>
        </div>

        <Link to="/analyze">
          Try Crop Analysis →
        </Link>
      </section>
    </main>
  );
}

export default Dataset;