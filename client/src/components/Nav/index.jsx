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
          <li className="nav-item mx-1">
            <a className="btn btn-dark" aria-current="page" href="/user" role="button">
              Profile
            </a>
          </li>
          <li className="nav-item mx-1">
            <a className="btn btn-danger" onClick={() => Auth.logout()} role="button">
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="nav justify-content-end">
          <li className="nav-item mx-1">
            <a className="btn btn-dark" aria-current="page" href="/signup" role="button">
              Signup
            </a>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1 shadow-sm mb-5 zilla-slab-regular">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <h1 className="graduate-regular fw-bold">
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
