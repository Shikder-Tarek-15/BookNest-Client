import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Components/Home/Home";
import ErrorPage from "../ErrorPage/ErrorPage";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import Rooms from "../Components/Rooms/Rooms";
import RoomDetails from "../Components/Rooms/RoomDetails";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyBookings from "../Components/MyBookings/MyBookings";

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
        loader: () => fetch(`${import.meta.env.VITE_API_LINK}/availableRooms`),
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
