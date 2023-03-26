import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Root, { loader as loaderRoot } from "../../routers/Root";
import Users, { loader as loaderUsers } from "../../routers/Users";
import User, { loader as loaderUser } from "../../routers/User";
import ErrorPage from "../../routers/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: loaderRoot,
    errorElement: <ErrorPage />,
  },
  {
    path: "/users",
    element: <Users />,
    loader: loaderUsers,
    errorElement: <ErrorPage />,
  },
  {
    path: "/users/:idUser",
    element: <User />,
    loader: loaderUser,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
