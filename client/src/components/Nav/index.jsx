import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {
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
          { showNavigation() }
        </div>
      </nav>
    </header>
  );
}

export default Nav;
