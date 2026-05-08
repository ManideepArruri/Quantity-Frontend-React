import { useState, useEffect } from "react";
import { getErrorHistory } from "../api/api";

export default function ErrorsPage() {
  const [records, setRecords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // Auto-fetch on mount
  useEffect(() => {
    getErrorHistory()
      .then(setRecords)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);
    getErrorHistory()
      .then(setRecords)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Error Log</h1>
        <p className="page-desc">
          All operations that resulted in an error — incompatible types, divide by zero, invalid units.
          Errors are always saved to the database for audit.
        </p>
        <button className="btn-ghost" onClick={refetch} disabled={loading}>
          {loading ? "Refreshing…" : "Refresh ↺"}
        </button>
      </div>

      {loading && <p className="loading-text">Loading error history…</p>}
      {error && <p className="inline-error">{error}</p>}

      {records !== null && (
        <div className="history-list">
          {records.length === 0 ? (
            <div className="empty-state">
              <p className="empty-icon">✓</p>
              <p>No errors recorded. All operations succeeded.</p>
            </div>
          ) : (
            records.map((item, i) => (
              <div key={i} className="error-record">
                <div className="error-record-header">
                  <span className="row-op">{item.operation}</span>
                  <span className="error-badge">ERROR</span>
                </div>
                <p className="error-msg">{item.errorMessage}</p>
                <div className="error-record-meta">
                  <span>{item.thisValue} {item.thisUnit} ({item.thisMeasurementType})</span>
                  <span className="meta-sep">·</span>
                  <span>{item.thatValue} {item.thatUnit} ({item.thatMeasurementType})</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}