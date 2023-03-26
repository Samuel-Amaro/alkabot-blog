import { useRouteError, NavLink, isRouteErrorResponse } from "react-router-dom";
import TriangleExclamation from "../../components/Icons/TriangleExclamation";
import "./ErrorPage.css";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="error">
      <h2 className="error__title">
        <TriangleExclamation className="error__icon"/>
        Oops!
      </h2>
      <p className="error__description">
        Desculpe, ocorreu um erro inesperado.
      </p>
      <p className="error__message">
        {isRouteErrorResponse(error) ? (
          <i>{error.statusText || error.statusText}</i>
        ) : (
          "Oops"
        )}
      </p>
      <NavLink
        to="/"
        target="_self"
        rel="next"
        aria-label="Return view posts"
        title="Return view posts"
        className="error__link"
      >
        Posts
      </NavLink>
    </div>
  );
}
