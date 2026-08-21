import { useState } from "react";

import "./Signup.css";
import { Link } from "react-router-dom";
import authService from "../../services/authService";
import AppFormControlError from "../../components/AppFormControlError/AppFormControlError";

function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const validation = {
      firstName: form.firstName.trim() === "",

      lastName: form.lastName.trim() === "",

      email: form.email.trim() === "",

      password: form.password.trim() === "",

      confirmPassword:
        form.confirmPassword.trim() === "" ||
        form.password !== form.confirmPassword,
    };

    setErrors(validation);

    if (Object.values(validation).some(Boolean)) {
      return;
    }

    const result = authService.signup({
      // id: crypto.randomUUID(),
      key: "",
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
        <div className="app-form-group">
          <label className="app-form-label">First Name</label>

          <input
            className={`app-form-input ${errors.firstName ? "is-invalid" : ""}`}
            name="firstName"
            placeholder="John"
            value={form.firstName}
            onChange={handleChange}
          />
          <AppFormControlError
            invalid={errors.firstName}
            message={"FirstName is required"}
          />
        </div>

        <div className="app-form-group">
          <label className="app-form-label">Last Name</label>

          <input
            className={`app-form-input ${errors.lastName ? "is-invalid" : ""}`}
            name="lastName"
            placeholder="Smith"
            value={form.lastName}
            onChange={handleChange}
          />
          <AppFormControlError
            invalid={errors.lastName}
            message={"LastName is required"}
          />
        </div>

        <div className="app-form-group">
          <label className="app-form-label">Email</label>

          <input
            className={`app-form-input ${errors.email ? "is-invalid" : ""}`}
            name="email"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
          />
          <AppFormControlError
            invalid={errors.email}
            message={"Email is required"}
          />
        </div>

        <div className="app-form-group">
          <label className="app-form-label">Password</label>

          <input
            className={`app-form-input ${errors.password ? "is-invalid" : ""}`}
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <AppFormControlError
            invalid={errors.password}
            message={"Password is required"}
          />
        </div>

        <div className="app-form-group">
          <label className="app-form-label">Confirm Password</label>

          <input
            className={`app-form-input ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <AppFormControlError
            invalid={errors.confirmPassword}
            message={"Confirm Password is required"}
          />
        </div>

        <button className="signup__button app-btn primary" type="submit">
          Create Account
        </button>

        <Link to="/login">
          <button className="login__button app-btn success" type="button">
            I have an account!
          </button>
        </Link>
      </form>
    </section>
  );
}

export default Signup;
