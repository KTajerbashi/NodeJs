import { useState, type FormEvent } from "react";

import userService from "../../services/userService";
import DataGrid from "../../components/DataGrid/DataGrid";

import "./Users.css";
import useUsers from "../../hooks/useUsers";
import { AppContainer } from "../../components/AppContainer/AppContainer";
import { AppCard } from "../../components/AppCard/AppCard";
import { AppContent } from "../../components/AppContent/AppContent";
import { AppTitle } from "../../components/AppTitle/AppTitle";
import AppFormError from "../../components/AppFormError/AppFormError";

const columns = [
  // {
  //   key: "key",
  //   title: "Key",
  // },
  {
    key: "firstName",
    title: "First Name",
  },
  {
    key: "lastName",
    title: "Last Name",
  },
  {
    key: "email",
    title: "Email",
  },
] as const;

const emptyForm = () => {
  return {
    key: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
};

function Users() {
  const { data, setData, loading, error, setError } = useUsers();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectRecord, setSelectRecord] = useState<IUser | null>(null);
  const [form, setForm] = useState<UserRequest>(emptyForm());

  const [formValidation, setFormValidation] =
    useState<UserRequest>(emptyForm());

  const validateForm = (): boolean => {
    const errors = emptyForm();

    if (!form.firstName.trim()) {
      errors.firstName = "First name is required.";
    } else if (form.firstName.trim().length < 2) {
      errors.firstName = "First name must be at least 2 characters.";
    }

    if (!form.lastName.trim()) {
      errors.lastName = "Last name is required.";
    } else if (form.lastName.trim().length < 2) {
      errors.lastName = "Last name must be at least 2 characters.";
    }

    if (!form.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!selectRecord && !form.password) {
      errors.password = "Password is required.";
    } else if (form.password && form.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setFormValidation(errors);

    return !Object.values(errors).some(Boolean);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setFormValidation((currentValidation) => ({
      ...currentValidation,
      [name]: "",
    }));
  };

  const openCreateForm = () => {
    setSelectRecord(null);

    setForm(emptyForm());

    setFormValidation(emptyForm());

    setIsFormOpen(true);
  };

  const openEditForm = (user: IUser) => {
    setSelectRecord(user);

    setForm({
      key: user.key,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "",
    });

    setFormValidation(emptyForm());

    setIsFormOpen(true);
  };
  const closeForm = () => {
    setIsFormOpen(false);
    setSelectRecord(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (selectRecord) {
        const updatedUser = await userService.update(selectRecord.key, form);

        setData((currentUsers) =>
          currentUsers.map((user) =>
            user.key === selectRecord.key
              ? {
                  ...user,
                  ...updatedUser,
                }
              : user,
          ),
        );
      } else {
        const createdUser = await userService.create(form);

        setData((currentUsers) => [...currentUsers, createdUser]);
      }

      closeForm();
    } catch (error) {
      console.error(error);
      setError("Failed to save user.");
    }
  };

  const handleDelete = async (user: IUser) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await userService.remove(user.key);

      setData((currentUsers) =>
        currentUsers.filter((item) => item.key !== user.key),
      );
    } catch (error) {
      console.error(error);
      setError("Failed to delete user.");
    }
  };

  const handleView = (user: IUser) => {
    window.alert(
      `Name: ${user.firstName} ${user.lastName}\nEmail: ${user.email}`,
    );
  };

  const handleRowClick = (user: IUser) => {
    console.log("Row clicked", user);
  };

  return (
    <AppContainer>
      <AppCard
        title={"User Management"}
        description={"Manage application users"}
        actions={
          <button
            type="button"
            className="app-btn success"
            onClick={openCreateForm}
          >
            New
          </button>
        }
      >
        {error && <div className="app-error">{error}</div>}

        {isFormOpen && (
          <AppCard>
            <form onSubmit={handleSubmit} noValidate>
              <AppContent>
                <AppTitle>
                  {selectRecord ? "Edit User" : "Create User"}
                </AppTitle>

                <div className="app-grid">
                  {/* First Name */}
                  <div className="app-width-1-4">
                    <label htmlFor="firstName">First Name</label>

                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={form.firstName}
                      className={`app-form-input ${formValidation.firstName ? "is-invalid" : ""}`}
                      onChange={handleChange}
                    />
                    <AppFormError
                      invalid={!formValidation.firstName}
                      message={formValidation.firstName}
                    />
                  </div>

                  {/* Last Name */}
                  <div className="app-width-1-4">
                    <label htmlFor="lastName">Last Name</label>

                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={form.lastName}
                      className={`app-form-input ${formValidation.lastName ? "is-invalid" : ""}`}
                      onChange={handleChange}
                    />
                    <AppFormError
                      invalid={formValidation.lastName.length > 0}
                      message={formValidation.lastName}
                    />
                  </div>

                  {/* Email */}
                  <div className="app-width-1-4">
                    <label htmlFor="email">Email</label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={form.email}
                      className={`app-form-input ${formValidation.email ? "is-invalid" : ""}`}
                      onChange={handleChange}
                    />

                    <AppFormError
                      invalid={formValidation.email.length > 0}
                      message={formValidation.email}
                    />
                  </div>

                  {/* Password */}
                  <div className="app-width-1-4">
                    <label htmlFor="password">Password</label>

                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder={
                        selectRecord ? "New Password (optional)" : "Password"
                      }
                      value={form.password}
                      className={`app-form-input ${formValidation.password ? "is-invalid" : ""}`}
                      onChange={handleChange}
                    />

                    <AppFormError
                      invalid={
                        formValidation.password == null
                          ? true
                          : formValidation.password.length > 0
                      }
                      message={formValidation.password}
                    />
                  </div>
                </div>

                <div className="user-form-actions">
                  <button type="button" className="app-btn" onClick={closeForm}>
                    Cancel
                  </button>

                  <button type="submit" className="app-btn success">
                    {selectRecord ? "Update" : "Create"}
                  </button>
                </div>
              </AppContent>
            </form>
          </AppCard>
        )}

        <DataGrid
          columns={columns}
          data={data}
          loading={loading}
          onRowClick={handleRowClick}
          actions={[
            {
              label: "View",
              className: "primary",
              onClick: handleView,
            },
            {
              label: "Edit",
              className: "success",
              onClick: openEditForm,
            },
            {
              label: "Delete",
              className: "danger",
              onClick: handleDelete,
            },
          ]}
        />
      </AppCard>
    </AppContainer>
  );
}

export default Users;
