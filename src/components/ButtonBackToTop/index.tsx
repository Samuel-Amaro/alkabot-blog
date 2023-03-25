import { useEffect, useState } from "react";
import AngleUp from "../Icons/AngleUp";
import "./BtnBackTop.css";

export default function BackToTop() {
  const [btnBackTopIsVisible, setBtnBackTopIsVisible] = useState(false);

  function handleWindowScroll() {
    if (window.pageYOffset > 60) {
      setBtnBackTopIsVisible(true);
    } else {
      setBtnBackTopIsVisible(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  });

  return (
    <button
      type="button"
      title="Return Back to the top page"
      aria-label="Return Back to the top page"
      className={
        btnBackTopIsVisible
          ? "button-backtop"
          : "button-backtop button-backtop--hidden"
      }
      onPointerDown={() => {
        window.scrollTo(0, 0);
      }}
      onKeyDown={(e) => {
        if(e.key === "Enter" || e.key === " ") {
          window.scrollTo(0, 0);
        }
      }}
    >
      <AngleUp className="button-backtop__icon" />
    </button>
  );
}
