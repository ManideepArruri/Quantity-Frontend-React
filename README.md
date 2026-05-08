# Quantity Measurement App

A React + Vite frontend for a quantity measurement system. The app lets users compare, convert, add, subtract, and divide quantities across compatible units. It also supports history and error logging from a backend API.

## Features

- Compare two quantities for equality across units of the same measurement type
- Convert a quantity from one unit to another
- Add and subtract quantities with optional result-unit selection
- Divide quantities and calculate result values
- Browse operation history by operation type, measurement type, or count
- View error logs for failed operations (e.g. invalid units, divide by zero)

## Pages

- `/` – Compare quantities
- `/convert` – Convert quantities between units
- `/add` – Add quantities, with an optional target output unit
- `/subtract` – Subtract quantities, with an optional target output unit
- `/divide` – Divide quantities
- `/history` – Query persisted operation history
- `/errors` – View logged error records

## Technology stack

- React 19
- Vite
- React Router DOM
- ESLint

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Backend requirements

This frontend expects a backend API at:

```text
http://localhost:8080/api/v1/quantities
```

The app uses these endpoints:

- `POST /compare`
- `POST /convert`
- `POST /add`
- `POST /add-with-target-unit`
- `POST /subtract`
- `POST /subtract-with-target-unit`
- `POST /divide`
- `GET /history/operation/:operation`
- `GET /history/type/:type`
- `GET /count/:operation`
- `GET /history/errored`

If the backend is not running, requests will fail with network or API errors.

## Source structure

- `src/App.jsx` — main router and page layout
- `src/components/Navbar.jsx` — top navigation bar
- `src/components/QuantityForm.jsx` — reusable quantity input form
- `src/components/ResultCard.jsx` — result display component
- `src/pages/` — page-level views for each operation
- `src/api/api.js` — API client for backend requests
- `src/api/constants.js` — supported measurement types and units

## Notes

- Quantity inputs are typed by measurement type, such as `LengthUnit`, `WeightUnit`, `VolumeUnit`, and `TemperatureUnit`
- Unit selection is constrained by the chosen measurement type
- Errors are persisted and visible on the `Error Log` page

## Scripts

- `npm run dev` — start development server
- `npm run build` — build production assets
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint across the project
