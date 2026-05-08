import { MEASUREMENT_TYPES, UNITS_BY_TYPE } from "../api/constants";

/**
 * Reusable quantity input block.
 * Props:
 *   label      — "First quantity" / "Second quantity" / "Target unit"
 *   value      — { value, unit, measurementType }
 *   onChange   — fn({ value, unit, measurementType })
 *   lockType   — if set, measurementType selector is hidden (locked to parent's type)
 *   hideValue  — if true, hides the numeric input (for target-unit-only selectors)
 */
export default function QuantityForm({ label, value, onChange, lockType, hideValue }) {
  const units = UNITS_BY_TYPE[value.measurementType] || [];

  const set = (key, val) => onChange({ ...value, [key]: val });

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    const newUnits = UNITS_BY_TYPE[newType] || [];
    onChange({ ...value, measurementType: newType, unit: newUnits[0] || "" });
  };

  return (
    <div className="qty-form">
      <p className="qty-label">{label}</p>
      <div className="qty-row">
        {!hideValue && (
          <input
            type="number"
            className="input-num"
            value={value.value}
            onChange={(e) => set("value", parseFloat(e.target.value) || 0)}
            placeholder="0.0"
          />
        )}
        <select
          className="input-select"
          value={value.unit}
          onChange={(e) => set("unit", e.target.value)}
        >
          {units.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
        {!lockType && (
          <select
            className="input-select"
            value={value.measurementType}
            onChange={handleTypeChange}
          >
            {MEASUREMENT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}