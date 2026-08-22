import { useState } from "react";

import "./Login.css";
import { Link } from "react-router-dom";
import authService from "../../services/authService";
import AppFormControlError from "../../components/AppFormControlError/AppFormControlError";

function Login() {
  const [email, setEmail] = useState("kamran_tajerbashi@mail.com");
  const [password, setPassword] = useState("123123123");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors = {
      email: email.trim() === "",
      password: password.trim() === "",
    };

    setErrors(newErrors);

    if (newErrors.email || newErrors.password) {
      return;
    }

    const result = await authService.login(email, password);
    if (result.isSuccess) {
      localStorage.setItem("accessToken", result.accessToken);
      window.location.href = "/dashboard";
    } else {
      setErrors({
        email: true,
        password: true,
      });
    }
  };

  return (
    <section className="login">
      <h1 className="login__title">Login</h1>

      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__field app-form-group">
          <label className="app-form-label">Email</label>

          <input
            className={`
    app-form-input
    ${errors.email ? "is-invalid" : ""}
  `}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({
                ...errors,
                email: false,
              });
            }}
            placeholder="email@example.com"
          />
          <AppFormControlError
            invalid={errors.email}
            message={"Email is required"}
          />
        </div>

        <div className="login__field app-form-group">
          <label className="app-form-label">Password</label>

          <input
            type="password"
            className={`app-form-input${errors.password ? "is-invalid" : ""}`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);

              setErrors({
                ...errors,
                password: false,
              });
            }}
            placeholder="Password"
          />
          <AppFormControlError
            invalid={errors.password}
            message={"Password is required"}
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
