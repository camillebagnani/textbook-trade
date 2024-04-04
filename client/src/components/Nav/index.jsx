import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul class="nav justify-content-end">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/user/:id">
              Profile
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul class="nav justify-content-end">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/signup">
              Signup
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/login">
              Login
            </a>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1 shadow-sm mb-5">
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
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
