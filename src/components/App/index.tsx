import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Root, { loader as loaderRoot } from "../../routers/Root";
import Users, {loader as loaderUsers} from "../../routers/Users";
import User from "../../routers/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: loaderRoot,
  },
  {
    path: "/users",
    element: <Users />,
    loader: loaderUsers,
  },
  {
    path: "/users/:idUser",
    element: <User />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
