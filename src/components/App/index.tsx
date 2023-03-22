import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Root, {loader as loaderRoot} from "../../routers/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: loaderRoot
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
