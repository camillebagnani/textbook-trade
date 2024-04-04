function Signup() {
  return (
    <div class="card">
      <div class="card-body">
        <h4 class="card-title mb-3">Signup</h4>
        <form>
        <div class="mb-3">
            <label for="usernameInput" class="form-label">
              Username
            </label>
            <input
              type="text"
              class="form-control"
              id="usernameInput"
            />
          </div>
          <div class="mb-3">
            <label for="emailInput" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="emailInput"
            />
          </div>
          <div class="mb-3">
            <label for="passwordInput" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="passwordInput"
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup;