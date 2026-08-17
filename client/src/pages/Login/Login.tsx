import { useState } from "react";

import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("admin");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({
      email,
      password,
    });
  };

  return (
    <section className="login">
      <h1 className="login__title">Login</h1>

      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__field">
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />
        </div>

        <div className="login__field">
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        <div className="login__options">
          <label>
            <input type="checkbox" />
            Remember me
          </label>

          <a href="#">Forgot password?</a>
        </div>

        <button type="submit" className="login__button">
          Login
        </button>
        <Link to="/signup" aria-label="Go to Login">
          <button className="signup__button" type="button">
            Create new account!
          </button>
        </Link>
      </form>
    </section>
  );
}

export default Login;
