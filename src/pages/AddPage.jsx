import { useState } from "react";
import QuantityForm from "../components/QuantityForm";
import ResultCard from "../components/ResultCard";
import { addQuantities, addWithTargetUnit } from "../api/api";
import { UNITS_BY_TYPE } from "../api/constants";

export default function AddPage() {
  const [thisQty, setThisQty]       = useState({ value: 1,  unit: "FEET",   measurementType: "LengthUnit" });
  const [thatQty, setThatQty]       = useState({ value: 12, unit: "INCHES", measurementType: "LengthUnit" });
  const [useTarget, setUseTarget]   = useState(false);
  const [targetQty, setTargetQty]   = useState({ value: 0, unit: "INCHES",  measurementType: "LengthUnit" });
  const [result, setResult]         = useState(null);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);

  const syncType = (qty, setter) => {
    setter(qty);
    if (qty.measurementType !== thatQty.measurementType) {
      const newUnits = UNITS_BY_TYPE[qty.measurementType];
      setThatQty({ ...thatQty, measurementType: qty.measurementType, unit: newUnits[0] });
      setTargetQty({ value: 0, measurementType: qty.measurementType, unit: newUnits[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = useTarget
        ? await addWithTargetUnit(thisQty, thatQty, targetQty)
        : await addQuantities(thisQty, thatQty);
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
        <h1 className="page-title">Add</h1>
        <p className="page-desc">
          Add two quantities of the same type. Optionally specify which unit the result should be in.
        </p>
      </div>

      <form className="op-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <QuantityForm label="First quantity"  value={thisQty} onChange={(q) => syncType(q, setThisQty)} />
          <div className="form-divider">+</div>
          <QuantityForm label="Second quantity" value={thatQty} onChange={setThatQty} lockType={thisQty.measurementType} />
        </div>

        <label className="toggle-row">
          <input
            type="checkbox"
            checked={useTarget}
            onChange={(e) => setUseTarget(e.target.checked)}
          />
          <span>Express result in a specific unit</span>
        </label>

        {useTarget && (
          <div className="form-row target-row">
            <QuantityForm
              label="Result unit"
              value={targetQty}
              onChange={setTargetQty}
              lockType={thisQty.measurementType}
              hideValue
            />
          </div>
        )}

        <button className="btn-submit" type="submit" disabled={loading}>
          {loading ? "Adding…" : "Add →"}
        </button>
      </form>

      {error && <p className="inline-error">{error}</p>}
      <ResultCard result={result} loading={loading} />
    </div>
  );
}