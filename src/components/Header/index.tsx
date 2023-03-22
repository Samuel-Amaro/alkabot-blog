import "./Header.css";
import home from "../../assets/images/home-bg.jpg";

export default function Header() {
    return (
      <header className="header">
        <div className="header__content">
          <h1 className="header__title">Alkabot Blog</h1>
          <p>Blog alkabot, com conteúdo técnico e enriquecedor para devs</p>
        </div>
      </header>
    );
}