import React, { useState } from "react";
import "./Predict.css";
import Slider from "../../components/Slider/Slider";
import { Flame, Droplet, Beaker, Sparkles } from "lucide-react";

function Predict() {

  const [values, setValues] = useState({
    fixedAcidity: 7.0,
    volatileAcidity: 0.5,
    citricAcid: 0.3,
    residualSugar: 2.5,
    chlorides: 0.08,
    freeSulfurDioxide: 30,
    totalSulfurDioxide: 115,
    density: 0.996,
    pH: 3.3,
    sulphates: 0.6,
    alcohol: 10.5
  });

  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (key, value) => {
    setValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePredict = async () => {

    setLoading(true);
    setError(null);
    setPrediction(null);
    setConfidence(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Backend response:", data);

      if (data.quality !== undefined) {
        setPrediction(Number(data.quality));
      } else {
        throw new Error("Invalid response structure");
      }

      if (data.confidence !== undefined) {
        setConfidence(Number(data.confidence));
      }

    } catch (err) {
      console.error("Prediction failed:", err);
      setError("Prediction failed. Check backend server.");
    }

    setLoading(false);
  };

  const features = [
    { key: "fixedAcidity", label: "Fixed Acidity", icon: <Flame size={20} color="#ffffff" />, min: 4, max: 16, step: 0.1, unit: "g/dm³" },
    { key: "volatileAcidity", label: "Volatile Acidity", icon: <Droplet size={20} color="#ffffff" />, min: 0.1, max: 1.5, step: 0.01, unit: "g/dm³" },
    { key: "citricAcid", label: "Citric Acid", icon: <Beaker size={20} color="#ffffff" />, min: 0, max: 1, step: 0.01, unit: "g/dm³" },
    { key: "residualSugar", label: "Residual Sugar", icon: <Sparkles size={20} color="#ffffff" />, min: 0.5, max: 15, step: 0.1, unit: "g/dm³" },
    { key: "chlorides", label: "Chlorides", icon: <Beaker size={20} color="#ffffff" />, min: 0.01, max: 0.2, step: 0.01, unit: "g/dm³" },
    { key: "freeSulfurDioxide", label: "Free Sulfur Dioxide", icon: <Sparkles size={20} color="#ffffff" />, min: 1, max: 75, step: 1, unit: "mg/dm³" },
    { key: "totalSulfurDioxide", label: "Total Sulfur Dioxide", icon: <Sparkles size={20} color="#ffffff" />, min: 6, max: 300, step: 1, unit: "mg/dm³" },
    { key: "density", label: "Density", icon: <Droplet size={20} color="#ffffff" />, min: 0.990, max: 1.005, step: 0.0001, unit: "g/cm³" },
    { key: "pH", label: "pH", icon: <Flame size={20} color="#ffffff" />, min: 2.5, max: 4.5, step: 0.01, unit: "" },
    { key: "sulphates", label: "Sulphates", icon: <Beaker size={20} color="#ffffff" />, min: 0.3, max: 2.0, step: 0.01, unit: "g/dm³" },
    { key: "alcohol", label: "Alcohol", icon: <Flame size={20} color="#ffffff" />, min: 8, max: 15, step: 0.1, unit: "%" }
  ];

  return (
    <div className="predict-page">

      <div className="predict-header">
        <h1>Predict Wine Quality</h1>
        <p>Adjust the chemical parameters below to receive an AI-powered prediction.</p>
      </div>

      <div className="predict-card">

        {features.map(feature => (
          <div className="feature-row" key={feature.key}>

            <div className="feature-top">
              <div className="feature-left">
                <div className="feature-icon">{feature.icon}</div>
                <span className="feature-label">{feature.label}</span>
              </div>

              <div className="feature-value">
                {values[feature.key]} {feature.unit}
              </div>
            </div>

            <div className="feature-slider">
              <Slider
                min={feature.min}
                max={feature.max}
                step={feature.step}
                value={values[feature.key]}
                onChange={(val) => handleChange(feature.key, val)}
                accent="#4b041e"
              />
            </div>

          </div>
        ))}

        <button
          className="predict-btn"
          onClick={handlePredict}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Predict Quality"}
        </button>

        {/* RESULT DISPLAY */}
        {prediction !== null && (
          <div style={{ marginTop: "25px", textAlign: "center" }}>
            <h2>Predicted Score is : {prediction}</h2>
            {confidence !== null && (
              <p>Confidence: {confidence}%</p>
            )}
          </div>
        )}

        {/* ERROR DISPLAY */}
        {error && (
          <div style={{ marginTop: "20px", color: "red", textAlign: "center" }}>
            {error}
          </div>
        )}

      </div>

    </div>
  );
}

export default Predict;
