import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home";
import Login from "../Components/Login/Login";
import MyBookings from "../Components/MyBookings/MyBookings";
import Register from "../Components/Register/Register";
import RoomDetails from "../Components/Rooms/RoomDetails";
import Rooms from "../Components/Rooms/Rooms";
import ErrorPage from "../ErrorPage/ErrorPage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Root from "../Root/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch(`${import.meta.env.VITE_API_LINK}/rooms`),
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
      },
      {
        path: "roomDetails/:id",
        element: (
          <PrivateRoute>
            <RoomDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_LINK}/roomDetails/${params.id}`),
      },
      {
        path: "my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
