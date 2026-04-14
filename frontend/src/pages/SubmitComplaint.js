// src/pages/SubmitComplaint.js
import React, { useState } from "react";
import "./Pages.css";
import API from "../services/api";

function SubmitComplaint() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  const handleSubmit = async () => {
    if (!title || !category || !details) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/submit", {
        title,
        category,
        description: details,
      });

      setTxHash(res.data.txHash);
      setTitle("");
      setCategory("");
      setDetails("");

    } catch {
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-card">
        <h2>Submit a complaint</h2>
        <p>Your complaint is stored permanently on-chain.</p>

        {txHash && (
          <div style={{ background: "#d4edda", color: "#155724", padding: "12px", borderRadius: "8px", marginBottom: "16px" }}>
            <strong>Complaint submitted successfully!</strong><br />
            <small>Transaction: <a href={"https://sepolia.etherscan.io/tx/" + txHash} target="_blank" rel="noreferrer" style={{color: "#0a5c36"}}>View on Etherscan</a></small>
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Complaint title</label>
          <input
            className="form-input"
            type="text"
            placeholder="e.g. Fraud by vendor"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
          >
            <option value="">Select category</option>
            <option>Fraud</option>
            <option>Harassment</option>
            <option>Corruption</option>
            <option>Other</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Complaint details</label>
          <textarea
            className="form-textarea"
            placeholder="Describe the issue in detail..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          type="button"
          className="btn-primary"
          style={{ width: "100%", padding: "12px", opacity: loading ? 0.7 : 1 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting on-chain, please wait..." : "Submit on-chain"}
        </button>
      </div>
    </div>
  );
}

export default SubmitComplaint;
