import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  { to: "/",          label: "Compare"   },
  { to: "/convert",   label: "Convert"   },
  { to: "/add",       label: "Add"       },
  { to: "/subtract",  label: "Subtract"  },
  { to: "/divide",    label: "Divide"    },
  { to: "/history",   label: "History"   },
  { to: "/errors",    label: "Errors"    },
];

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="brand-icon">⚖</span>
        <span className="brand-name">QuantityLab</span>
      </div>
      <ul className="nav-links">
        {NAV_LINKS.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                "nav-link" + (isActive ? " nav-link--active" : "")
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}