/**
 * Central API layer — all calls to the Spring Boot backend live here.
 * Base URL points to localhost:8080 (change for production).
 *
 * Every function returns the parsed JSON body on success,
 * or throws an Error with a readable message on failure.
 */

const BASE_URL = "http://localhost:8080/api/v1/quantities";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) {
    // Backend GlobalExceptionHandler returns { message, error, status }
    throw new Error(data.message || data.error || `HTTP ${res.status}`);
  }
  return data;
}

// ── POST — operations ────────────────────────────────────────────────────────

export const compareQuantities = (thisQty, thatQty) =>
  request("/compare", {
    method: "POST",
    body: JSON.stringify({ thisQuantityDTO: thisQty, thatQuantityDTO: thatQty }),
  });

export const convertQuantity = (thisQty, thatQty) =>
  request("/convert", {
    method: "POST",
    body: JSON.stringify({ thisQuantityDTO: thisQty, thatQuantityDTO: thatQty }),
  });

export const addQuantities = (thisQty, thatQty) =>
  request("/add", {
    method: "POST",
    body: JSON.stringify({ thisQuantityDTO: thisQty, thatQuantityDTO: thatQty }),
  });

export const addWithTargetUnit = (thisQty, thatQty, targetQty) =>
  request("/add-with-target-unit", {
    method: "POST",
    body: JSON.stringify({
      thisQuantityDTO: thisQty,
      thatQuantityDTO: thatQty,
      targetQuantityDTO: targetQty,
    }),
  });

export const subtractQuantities = (thisQty, thatQty) =>
  request("/subtract", {
    method: "POST",
    body: JSON.stringify({ thisQuantityDTO: thisQty, thatQuantityDTO: thatQty }),
  });

export const subtractWithTargetUnit = (thisQty, thatQty, targetQty) =>
  request("/subtract-with-target-unit", {
    method: "POST",
    body: JSON.stringify({
      thisQuantityDTO: thisQty,
      thatQuantityDTO: thatQty,
      targetQuantityDTO: targetQty,
    }),
  });

export const divideQuantities = (thisQty, thatQty) =>
  request("/divide", {
    method: "POST",
    body: JSON.stringify({ thisQuantityDTO: thisQty, thatQuantityDTO: thatQty }),
  });

// ── GET — history / analytics ────────────────────────────────────────────────

export const getOperationHistory = (operation) =>
  request(`/history/operation/${operation}`);

export const getHistoryByType = (type) =>
  request(`/history/type/${type}`);

export const getOperationCount = (operation) =>
  request(`/count/${operation}`);

export const getErrorHistory = () =>
  request("/history/errored");