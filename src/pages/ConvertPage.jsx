import { useState } from "react";
import QuantityForm from "../components/QuantityForm";
import ResultCard from "../components/ResultCard";
import { convertQuantity } from "../api/api";
import { UNITS_BY_TYPE } from "../api/constants";

export default function ConvertPage() {
  const [thisQty, setThisQty] = useState({
    value: 100,
    unit: "CELSIUS",
    measurementType: "TemperatureUnit",
  });
  const [targetUnit, setTargetUnit] = useState({
    value: 0,
    unit: "FAHRENHEIT",
    measurementType: "TemperatureUnit",
  });
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const handleThisChange = (qty) => {
    setThisQty(qty);
    if (qty.measurementType !== targetUnit.measurementType) {
      setTargetUnit({
        value: 0,
        measurementType: qty.measurementType,
        unit: UNITS_BY_TYPE[qty.measurementType][0],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await convertQuantity(thisQty, targetUnit);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Convert</h1>
        <p className="page-desc">
          Convert any quantity to a different unit of the same type.
          The value of the target is ignored — only its unit matters.
        </p>
      </div>

      <form className="op-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <QuantityForm label="Source quantity" value={thisQty} onChange={handleThisChange} />
          <div className="form-divider">→</div>
          <QuantityForm
            label="Target unit"
            value={targetUnit}
            onChange={setTargetUnit}
            lockType={thisQty.measurementType}
            hideValue
          />
        </div>
        <button className="btn-submit" type="submit" disabled={loading}>
          {loading ? "Converting…" : "Convert →"}
        </button>
      </form>

      {error && <p className="inline-error">{error}</p>}
      <ResultCard result={result} loading={loading} />
    </div>
  );
}