import { NavLink } from "react-router-dom";
import "./Navbar.css";
import React, { useRef, useState } from "react";
import Hamburguer from "../Icons/Hamburguer";

export default function Navbar() {
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
  const refsOptionsLinks = useRef<HTMLAnchorElement[] | null>(null);
  const refBtnMenu = useRef<HTMLButtonElement>(null);

  function getRefsItemsMenu() {
    if (!refsOptionsLinks.current) {
      refsOptionsLinks.current = [];
    }
    return refsOptionsLinks.current;
  }

  function setToFocus(itemId: number) {
    const refItems = getRefsItemsMenu();
    const item = refItems[itemId];
    item.focus();
  }

  function setToFocusPreviousItem(itemCurrent: HTMLAnchorElement) {
    const refItems = getRefsItemsMenu();
    let menuItemSelected = null;
    if (itemCurrent === refItems[0]) {
      menuItemSelected = itemCurrent;
    } else {
      const index = refItems.indexOf(itemCurrent);
      menuItemSelected = refItems[index - 1];
    }
    menuItemSelected.focus();
  }

  function setFocusNextItem(itemCurrent: HTMLAnchorElement) {
    const refItems = getRefsItemsMenu();
    let menuItemSelected = null;
    if (itemCurrent === refItems[refItems.length - 1]) {
      menuItemSelected = itemCurrent;
    } else {
      const index = refItems.indexOf(itemCurrent);
      menuItemSelected = refItems[index + 1];
    }
    menuItemSelected.focus();
  }

  function handleKeyDownItemMenuLink(
    e: React.KeyboardEvent<HTMLAnchorElement>
  ) {
    if (e.ctrlKey || e.altKey || e.metaKey) {
      return;
    } else {
      switch (e.key) {
        case "Esc":
        case "Escape":
          //fecha menu
          refBtnMenu.current?.focus();
          setIsNavbarExpanded(false);
          break;
        case "Up":
        case "ArrowUp":
          //move foco para cima
          setToFocusPreviousItem(e.currentTarget);
          break;
        case "ArrowDown":
        case "Down":
          //move foco para baixo
          setFocusNextItem(e.currentTarget);
          break;
        case "Home":
        case "PageUp":
          //move foco para primeira option menu
          setToFocus(0);
          break;
        case "End":
        case "PageDown":
          //move foco para ultima option do menu
          setToFocus(getRefsItemsMenu().length - 1);
          break;
        default:
          break;
      }
    }
  }

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
          ref={refBtnMenu}
          onPointerDown={() => {
            setIsNavbarExpanded(!isNavbarExpanded);
          }}
          onKeyDown={(e) => {
            setIsNavbarExpanded(true);
            switch (e.key) {
              case "ArrowUp":
              case "Home":
                //foco para a primeira option do menu
                setToFocus(0);
                break;
              case "Enter":
              case " ":
              case "ArrowDown":
              case "Down":
              case "End":
                //foco para a ultima option do menu
                setToFocus(1);
                break;
              case "Esc":
              case "Escape":
                //fecha o menu
                setIsNavbarExpanded(false);
                //move o foco para btn menu
                if (refBtnMenu.current) refBtnMenu.current.focus();
                break;
              default:
                break;
            }
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
              aria-label="To page Posts"
              title="To page Posts"
              ref={(link) => {
                const refItems = getRefsItemsMenu();
                if (link) {
                  refItems[0] = link;
                } else {
                  refItems.splice(0, 1);
                }
              }}
              onKeyDown={(e) => {
                handleKeyDownItemMenuLink(e);
              }}
            >
              Posts
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
              ref={(link) => {
                const refItems = getRefsItemsMenu();
                if (link) {
                  refItems[1] = link;
                } else {
                  refItems.splice(1, 1);
                }
              }}
              onKeyDown={(e) => {
                handleKeyDownItemMenuLink(e);
              }}
            >
              Users
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
