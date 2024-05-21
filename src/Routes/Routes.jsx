import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Components/Home/Home";
import ErrorPage from "../ErrorPage/ErrorPage";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import Rooms from "../Components/Rooms/Rooms";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "rooms",
        element: <Rooms />,
        loader: () => fetch(`${import.meta.env.VITE_API_LINK}/allRooms`),
      },
    ],
  },
]);

export default router;
