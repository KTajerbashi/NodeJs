import { useState } from "react";

import "./Signup.css";
import { Link } from "react-router-dom";
import authService from "../../services/authService";

function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const result = authService.signup({
      id: crypto.randomUUID(),

      ...form,
    });

    if (result) {
      alert("Account created successfully");
      window.location.href = "/login";
    }
  };
  return (
    <section className="signup">
      <div className="signup__header">
        <h1 className="signup__title">Create Account</h1>

        <p className="signup__description">
          Create your account to access the dashboard.
        </p>
      </div>

      <form className="signup__form" onSubmit={handleSubmit}>
        <div className="signup__field">
          <label>First Name</label>

          <input
            name="firstName"
            placeholder="John"
            value={form.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="signup__field">
          <label>Last Name</label>

          <input
            name="lastName"
            placeholder="Smith"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="signup__field">
          <label>Email</label>

          <input
            name="email"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="signup__field">
          <label>Password</label>

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="signup__field">
          <label>Confirm Password</label>

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button className="signup__button" type="submit">
          Create Account
        </button>
        <Link to="/login" aria-label="Go to Login">
          <button className="login__button" type="button">
            I have an account!
          </button>
        </Link>
      </form>
    </section>
  );
}

export default Signup;
