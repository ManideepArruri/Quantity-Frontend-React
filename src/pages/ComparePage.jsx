import { useState } from "react";
import QuantityForm from "../components/QuantityForm";
import ResultCard from "../components/ResultCard";
import { compareQuantities } from "../api/api";
import { UNITS_BY_TYPE } from "../api/constants";

const defaultQty = (type = "LengthUnit") => ({
  value: 0,
  unit: UNITS_BY_TYPE[type][0],
  measurementType: type,
});

export default function ComparePage() {
  const [thisQty, setThisQty]   = useState(defaultQty());
  const [thatQty, setThatQty]   = useState({ ...defaultQty(), unit: "INCHES", value: 12 });
  const [result, setResult]     = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  // Keep thatQty's measurementType in sync with thisQty
  const handleThisChange = (qty) => {
    setThisQty(qty);
    if (qty.measurementType !== thatQty.measurementType) {
      setThatQty({
        ...thatQty,
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
      const data = await compareQuantities(thisQty, thatQty);
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
        <h1 className="page-title">Compare</h1>
        <p className="page-desc">
          Are two quantities equal? Both are converted to their base unit before comparing.
        </p>
      </div>

      <form className="op-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <QuantityForm label="First quantity" value={thisQty} onChange={handleThisChange} />
          <div className="form-divider">≟</div>
          <QuantityForm
            label="Second quantity"
            value={thatQty}
            onChange={setThatQty}
            lockType={thisQty.measurementType}
          />
        </div>
        <button className="btn-submit" type="submit" disabled={loading}>
          {loading ? "Comparing…" : "Compare →"}
        </button>
      </form>

      {error && <p className="inline-error">{error}</p>}
      <ResultCard result={result} loading={loading} />
    </div>
  );
}