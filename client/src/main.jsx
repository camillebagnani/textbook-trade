import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import NoMatch from "./pages/NoMatch.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup";
import User from "./pages/User"
import SubjectSearch from "./pages/subjectSearch.jsx";
// import BookListings from "./pages/BookListings"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NoMatch />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      // {
      //   path: '/book/:id',
      //   element: <Book />,
      // },
      {
        path: '/user',
        element: <User />,
      },
      {
        path: '/subject',
        element: <SubjectSearch />
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
