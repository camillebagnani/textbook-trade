import { useState, useEffect } from "react";
import Auth from "../../utils/auth";

function Nav() {
  const [darkTheme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("darkTheme");
    return storedTheme ? JSON.parse(storedTheme) : false;
  });

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "light");
    }

    localStorage.setItem("darkTheme", JSON.stringify(darkTheme));
  }, [darkTheme]);

  function handleTheme() {
    if (darkTheme) {
      setTheme(false);
    } else {
      setTheme(true);
    }
  }

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/user/:id">
              Profile
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/signup">
              Signup
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">
              Login
            </a>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1 shadow-sm mb-5">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <h1>
              <span role="img" aria-label="textbook">
                📚
              </span>
              Textbook Trade
            </h1>
          </a>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="darkThemeSwitch"
              onClick={handleTheme}
              defaultChecked={darkTheme}
            />
            <label className="form-check-label" forhtml="darkThemeSwitch">
              Dark theme
            </label>
          </div>
          {showNavigation()}
        </div>
      </nav>
    </header>
  );
}

export default Nav;
