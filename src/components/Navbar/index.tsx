import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import Hamburguer from "../Icons/Hamburguer";

export default function Navbar() {
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <NavLink
          to="/"
          className="navbar__link"
          target="_self"
          rel="next"
          aria-label="To page Home"
          title="To page Home"
        >
          Alkabot
        </NavLink>
        <button
          type="button"
          className="navbar__btn-menu"
          aria-controls="navbarlist"
          aria-expanded={isNavbarExpanded}
          aria-label="Toggle navigation"
          title="Toggle navigation"
          onPointerDown={() => {
            setIsNavbarExpanded(!isNavbarExpanded);
          }}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              setIsNavbarExpanded(!isNavbarExpanded);
            }
          }}
        >
          <Hamburguer className="navbar__icon-btn" />
        </button>
        <ul
          className={
            isNavbarExpanded
              ? "navbar__list"
              : "navbar__list navbar__list--hidden"
          }
          id="navbarlist"
        >
          <li className="navbar__item">
            <NavLink
              to="/"
              className="navbar__link"
              target="_self"
              rel="next"
              aria-label="To page Home"
              title="To page Home"
            >
              Home
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              to="/users"
              className="navbar__link"
              target="_self"
              rel="next"
              aria-label="To page users"
              title="To page users"
            >
              Users
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
