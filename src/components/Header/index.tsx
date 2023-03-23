import "./Header.css";

type PropsHeader = {
  title: string;
  description: string;
};

export default function Header({title, description} : PropsHeader) {
    return (
      <header className="header">
        <div className="header__content">
          <h1 className="header__title">{title}</h1>
          <p className="header__description">{description}</p>
        </div>
      </header>
    );
}