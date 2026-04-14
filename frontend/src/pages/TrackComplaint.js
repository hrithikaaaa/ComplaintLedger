// src/pages/TrackComplaint.js
import React, { useState } from "react";
import "./Pages.css";
import API from "../services/api";

const STATUS_MAP = {
  0: "Submitted",
  1: "Under Review",
  2: "Resolved",
  3: "Rejected",
};

function TrackComplaint() {
  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!id) {
      alert("Please enter Complaint ID");
      return;
    }
    try {
      setLoading(true);
      setError("");
      setData(null);
      const res = await API.get(`/status/${id}`);
      setData(res.data);
    } catch {
      setError("Complaint not found. Please check the ID and try again.");
    } finally {
      setLoading(false);
    }
  };

  const statusText = data ? (STATUS_MAP[data.status] || "Unknown") : "";
  const date = data ? new Date(data.timestamp * 1000).toLocaleDateString() : "";

  return (
    <div className="page-wrapper">
      <div className="form-card">
        <h2>Track your complaint</h2>
        <p>Enter your complaint ID to view live status.</p>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            className="form-input"
            type="number"
            placeholder="e.g. 1"
            style={{ flex: 1 }}
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={loading}
          />
          <button
            type="button"
            className="btn-primary"
            onClick={handleTrack}
            disabled={loading}
          >
            {loading ? "Tracking..." : "Track"}
          </button>
        </div>

        {error && (
          <div style={{ color: "red", marginTop: "12px" }}>{error}</div>
        )}

        {data && (
          <div className="track-result">
            <div className="track-id">
              Complaint #{data.id} · Submitted on {date}
            </div>
            <div className="status-badge">
              <span className="pulse"></span> {statusText}
            </div>
            <div style={{ marginTop: "12px" }}>
              <p><strong>Title:</strong> {data.title}</p>
              <p><strong>Category:</strong> {data.category}</p>
              <p><strong>Description:</strong> {data.description}</p>
              <p><strong>Submitted by:</strong> {data.submittedBy}</p>
            </div>
            <div className="timeline">
              <div className="tl-item">
                <div className="tl-dot done"></div>
                <div className="tl-text">
                  <strong>Submitted</strong> · {date}
                </div>
              </div>
              <div className="tl-item">
                <div className={"tl-dot " + (data.status >= 1 ? "done" : "pending")}></div>
                <div className="tl-text">
                  <strong>Under Review</strong>
                </div>
              </div>
              <div className="tl-item">
                <div className={"tl-dot " + (data.status >= 2 ? "done" : "pending")}></div>
                <div className="tl-text">
                  <strong>Resolved</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackComplaint;
