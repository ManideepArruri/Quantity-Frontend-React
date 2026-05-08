/**
 * Displays the QuantityMeasurementDTO response from any operation.
 * Shows either a success result or an error panel.
 */
export default function ResultCard({ result, loading }) {
  if (loading) {
    return (
      <div className="result-card loading">
        <div className="spinner" />
        <span>Sending to backend…</span>
      </div>
    );
  }

  if (!result) return null;

  if (result.error) {
    return (
      <div className="result-card error">
        <p className="result-tag error-tag">ERROR</p>
        <p className="result-message">{result.errorMessage}</p>
        <div className="result-meta">
          <span>{result.operation}</span>
          <span>{result.thisMeasurementType}</span>
        </div>
      </div>
    );
  }

  const isComparison = result.operation === "COMPARE";

  return (
    <div className="result-card success">
      <p className="result-tag success-tag">{result.operation}</p>
      {isComparison ? (
        <p className={`result-big ${result.resultString === "true" ? "equal" : "notequal"}`}>
          {result.resultString === "true" ? "EQUAL" : "NOT EQUAL"}
        </p>
      ) : (
        <p className="result-big">
          {typeof result.resultValue === "number"
            ? result.resultValue.toFixed(4).replace(/\.?0+$/, "")
            : "—"}
          <span className="result-unit"> {result.resultUnit}</span>
        </p>
      )}
      <div className="result-operands">
        <span>{result.thisValue} {result.thisUnit}</span>
        <span className="op-symbol">
          {result.operation === "ADD" ? "+" :
           result.operation === "SUBTRACT" ? "−" :
           result.operation === "DIVIDE" ? "÷" :
           result.operation === "COMPARE" ? "≟" : "→"}
        </span>
        <span>{result.thatValue} {result.thatUnit}</span>
      </div>
    </div>
  );
}