import { useState } from "react";
import QuantityForm from "../components/QuantityForm";
import ResultCard from "../components/ResultCard";
import { divideQuantities } from "../api/api";
import { UNITS_BY_TYPE } from "../api/constants";

export default function DividePage() {
  const [thisQty, setThisQty] = useState({ value: 1, unit: "YARDS", measurementType: "LengthUnit" });
  const [thatQty, setThatQty] = useState({ value: 1, unit: "FEET",  measurementType: "LengthUnit" });
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const syncType = (qty) => {
    setThisQty(qty);
    if (qty.measurementType !== thatQty.measurementType) {
      const newUnits = UNITS_BY_TYPE[qty.measurementType];
      setThatQty({ ...thatQty, measurementType: qty.measurementType, unit: newUnits[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await divideQuantities(thisQty, thatQty);
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
        <h1 className="page-title">Divide</h1>
        <p className="page-desc">
          Divide the first quantity by the second. Both are converted to their base unit first.
          Dividing by zero returns an error.
        </p>
      </div>

      <form className="op-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <QuantityForm label="Numerator"   value={thisQty} onChange={syncType} />
          <div className="form-divider">÷</div>
          <QuantityForm label="Denominator" value={thatQty} onChange={setThatQty} lockType={thisQty.measurementType} />
        </div>
        <button className="btn-submit" type="submit" disabled={loading}>
          {loading ? "Dividing…" : "Divide →"}
        </button>
      </form>

      {error && <p className="inline-error">{error}</p>}
      <ResultCard result={result} loading={loading} />
    </div>
  );
}