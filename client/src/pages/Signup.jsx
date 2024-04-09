import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

function Signup() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formState.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    const response = await addUser({
      variables: {
        username: formState.username,
        email: formState.email,
        password: formState.password,
      },
    });
    const token = response.data.addUser.token;
    console.log(token);
    Auth.login(token);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="card zilla-slab-regular">
      <div className="card-body">
        <h4 className="card-title mb-3 graduate-regular text-danger">Signup</h4>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="usernameInput" className="form-label">
              Username
            </label>
            <input
              name="username"
              type="text"
              className="form-control"
              id="usernameInput"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">
              Email address
            </label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="emailInput"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="passwordInput"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
        <p className="mt-3">
          Already have an account?{" "}
          <span>
            <a href="/">Log in instead.</a>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
