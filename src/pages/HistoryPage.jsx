import { useState } from "react";
import { getOperationHistory, getHistoryByType, getOperationCount } from "../api/api";
import { OPERATION_TYPES, MEASUREMENT_TYPES } from "../api/constants";

function HistoryRow({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`history-row ${item.error ? "row-error" : "row-ok"}`}>
      <button className="history-summary" onClick={() => setOpen(!open)}>
        <span className="row-index">#{index + 1}</span>
        <span className="row-op">{item.operation}</span>
        <span className="row-expr">
          {item.thisValue} {item.thisUnit}
          {item.operation === "COMPARE" ? " ≟ " :
           item.operation === "ADD"     ? " + " :
           item.operation === "SUBTRACT"? " − " :
           item.operation === "DIVIDE"  ? " ÷ " : " → "}
          {item.thatValue} {item.thatUnit}
        </span>
        <span className="row-result">
          {item.error
            ? "ERROR"
            : item.resultString
            ? item.resultString.toUpperCase()
            : `${item.resultValue?.toFixed?.(4).replace(/\.?0+$/, "") ?? ""} ${item.resultUnit ?? ""}`}
        </span>
        <span className="row-chevron">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="history-detail">
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default function HistoryPage() {
  const [mode, setMode]       = useState("operation");   // "operation" | "type" | "count"
  const [opValue, setOpValue] = useState("COMPARE");
  const [typeValue, setTypeValue] = useState("LengthUnit");
  const [records, setRecords] = useState(null);
  const [count, setCount]     = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const handleQuery = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecords(null);
    setCount(null);
    try {
      if (mode === "operation") {
        setRecords(await getOperationHistory(opValue));
      } else if (mode === "type") {
        setRecords(await getHistoryByType(typeValue));
      } else {
        setCount(await getOperationCount(opValue));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">History</h1>
        <p className="page-desc">
          Query all stored operations from the database. Every operation is persisted — including errors.
        </p>
      </div>

      <form className="op-form" onSubmit={handleQuery}>
        <div className="tab-row">
          {["operation", "type", "count"].map((m) => (
            <button
              key={m}
              type="button"
              className={`tab-btn ${mode === m ? "tab-active" : ""}`}
              onClick={() => setMode(m)}
            >
              {m === "operation" ? "By operation" :
               m === "type"      ? "By type"      : "Count"}
            </button>
          ))}
        </div>

        {(mode === "operation" || mode === "count") && (
          <div className="field-row">
            <label className="field-label">Operation type</label>
            <select className="input-select" value={opValue} onChange={(e) => setOpValue(e.target.value)}>
              {OPERATION_TYPES.map((op) => <option key={op}>{op}</option>)}
            </select>
          </div>
        )}

        {mode === "type" && (
          <div className="field-row">
            <label className="field-label">Measurement type</label>
            <select className="input-select" value={typeValue} onChange={(e) => setTypeValue(e.target.value)}>
              {MEASUREMENT_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        )}

        <button className="btn-submit" type="submit" disabled={loading}>
          {loading ? "Querying…" : "Query →"}
        </button>
      </form>

      {error && <p className="inline-error">{error}</p>}

      {count !== null && (
        <div className="count-result">
          <span className="count-label">Successful {opValue} operations</span>
          <span className="count-number">{count}</span>
        </div>
      )}

      {records !== null && (
        <div className="history-list">
          {records.length === 0 ? (
            <p className="empty-state">No records found.</p>
          ) : (
            records.map((item, i) => <HistoryRow key={i} item={item} index={i} />)
          )}
        </div>
      )}
    </div>
  );
}