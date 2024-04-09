import { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { LOGIN } from "../../utils/mutations";

function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({
        variables: {
          email: formState.email,
          password: formState.password,
        },
      });
      const token = response.data.login.token;
      Auth.login(token);
    } catch (err) {
      console.log(err);
    }
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
        <h3 className="card-title mb-3 graduate-regular text-danger">Login</h3>
        <form onSubmit={handleFormSubmit}>
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
          <button type="submit" className="btn btn-dark text-light">
            Submit
          </button>
        </form>
        <p className="mt-3">
          Don't have an account?{" "}
          <span>
            <a href="/signup">Sign up!</a>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
