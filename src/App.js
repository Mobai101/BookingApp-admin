import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home, { homeLoader } from "./pages/Home";
import Root, { rootLoader } from "./pages/Root";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Logout from "./pages/Logout";
import Hotels, { hotelsLoader } from "./pages/Hotels";
import Rooms, { roomsLoader } from "./pages/Rooms";
import Transactions, { transactionsLoader } from "./pages/Transactions";
import NewHotel, { newHotelLoader } from "./pages/NewHotel";
import EditHotel, { editHotelLoader } from "./pages/EditHotel";
import NewRoom, { newRoomLoader } from "./pages/NewRoom";
import EditRoom, { editRoomLoader } from "./pages/EditRoom";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "transactions",
        element: <Transactions />,
        loader: transactionsLoader,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "hotels",
        children: [
          {
            index: true,
            element: <Hotels />,
            loader: hotelsLoader,
          },
          {
            path: "new",
            element: <NewHotel />,
            loader: newHotelLoader,
          },
          {
            path: "edit/:hotelId",
            element: <EditHotel />,
            loader: editHotelLoader,
          },
        ],
      },
      {
        path: "rooms",
        children: [
          {
            index: true,
            element: <Rooms />,
            loader: roomsLoader,
          },
          {
            path: "new",
            element: <NewRoom />,
            loader: newRoomLoader,
          },
          {
            path: "edit/:roomId",
            element: <EditRoom />,
            loader: editRoomLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
