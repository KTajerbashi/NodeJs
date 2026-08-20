import { useEffect, useState, type FormEvent } from "react";

import userService from "../../services/userService";
import DataGrid from "../../components/DataGrid/DataGrid";

import "./Users.css";

function Users() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);

  const [form, setForm] = useState<UserRequest>({
    key: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    let cancelled = false;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await userService.getAll();

        if (!cancelled) {
          setUsers(data);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(error);
          setError("Failed to load users.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  const openCreateForm = () => {
    setEditingUser(null);

    setForm({
      key: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });

    setIsFormOpen(true);
  };

  const openEditForm = (user: IUser) => {
    console.log("openEditForm : ", user);
    setEditingUser(user);

    setForm({
      key: user.key,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "",
    });

    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (editingUser) {
        const updatedUser = await userService.update(editingUser.key, form);

        setUsers((currentUsers) =>
          currentUsers.map((user) =>
            user.key === editingUser.key
              ? {
                  ...user,
                  ...updatedUser,
                }
              : user,
          ),
        );
      } else {
        const createdUser = await userService.create(form);

        setUsers((currentUsers) => [...currentUsers, createdUser]);
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

      setUsers((currentUsers) =>
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

  return (
    <div className="users-page">
      <div className="users-header">
        <div>
          <h1>Users</h1>
          <p>Manage application users</p>
        </div>

        <button
          type="button"
          className="app-btn primary"
          onClick={openCreateForm}
        >
          Add User
        </button>
      </div>

      {error && <div className="users-error">{error}</div>}

      {isFormOpen && (
        <div className="app-container">
          <form onSubmit={handleSubmit}>
            <div className="app-content">
              <h2>{editingUser ? "Edit User" : "Create User"}</h2>
            </div>
            <div className="app-content">
              <div className="app-grid">
                <div className="app-width-1-4">
                  <label htmlFor="firstName">FirstName</label>
                  <input
                    type="text"
                    className="app-form-input"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        firstName: event.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="app-width-1-4">
                  <label htmlFor="lastName">LastName</label>
                  <input
                    type="text"
                    className="app-form-input"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        lastName: event.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="app-width-1-4">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="app-form-input"
                    placeholder="Email"
                    value={form.email}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        email: event.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="app-width-1-4">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="app-form-input"
                    placeholder={
                      editingUser ? "New Password (optional)" : "Password"
                    }
                    value={form.password}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        password: event.target.value,
                      })
                    }
                    required={!editingUser}
                  />
                </div>
              </div>
            </div>
            <div className="app-content">
              <div className="user-form-actions">
                <button type="button" className="app-btn" onClick={closeForm}>
                  Cancel
                </button>

                <button type="submit" className="app-btn success">
                  {editingUser ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <DataGrid
        columns={columns}
        data={users}
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
    </div>
  );
}

export default Users;
