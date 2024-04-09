import { React, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import NoMatch from "./pages/NoMatch.jsx";
import Signup from "./pages/Signup";
import User from "./pages/User";
import SubjectSearch from "./pages/subjectSearch.jsx";
import Auth from "./utils/auth.js";

const ProtectedRoute = ({ element, path }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  return <>{element}</>;
};

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
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/user",
        element: <ProtectedRoute path="/user" element={<User />} />,
      },
      {
        path: "/subject",
        element: <ProtectedRoute path="/subject" element={<SubjectSearch />} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
