import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar       from "./components/Navbar";
import ComparePage  from "./pages/ComparePage";
import ConvertPage  from "./pages/ConvertPage";
import AddPage      from "./pages/AddPage";
import SubtractPage from "./pages/SubtractPage";
import DividePage   from "./pages/DividePage";
import HistoryPage  from "./pages/HistoryPage";
import ErrorsPage   from "./pages/ErrorsPage";

/**
 * App — root component.
 *
 * React Router structure:
 *
 *   /           → ComparePage
 *   /convert    → ConvertPage
 *   /add        → AddPage        (handles both /add and /add-with-target-unit)
 *   /subtract   → SubtractPage   (handles both /subtract and /subtract-with-target-unit)
 *   /divide     → DividePage
 *   /history    → HistoryPage    (by operation, by type, count)
 *   /errors     → ErrorsPage     (all error records)
 *   *           → redirect to /
 */
export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/"         element={<ComparePage />}  />
            <Route path="/convert"  element={<ConvertPage />}  />
            <Route path="/add"      element={<AddPage />}      />
            <Route path="/subtract" element={<SubtractPage />} />
            <Route path="/divide"   element={<DividePage />}   />
            <Route path="/history"  element={<HistoryPage />}  />
            <Route path="/errors"   element={<ErrorsPage />}   />
            <Route path="*"         element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}