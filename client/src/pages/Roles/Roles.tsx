// import useRoles from "../../hooks/useRoles";
import "./Roles.css";
import { AppContainer } from "../../components/AppContainer/AppContainer";
import { AppCard } from "../../components/AppCard/AppCard";
import { AppContent } from "../../components/AppContent/AppContent";
import { AppTitle } from "../../components/AppTitle/AppTitle";
import { useState, type FormEvent } from "react";
import DataGrid from "../../components/DataGrid/DataGrid";
import useRoles from "../../hooks/useRoles";
import { AppAction } from "../../components/AppActions/AppActions";
import roleService from "../../services/roleService";
const columns = [
  {
    key: "title",
    title: "Title",
  },
  {
    key: "code",
    title: "Code",
  },
] as const;

const emptyForm = (): IRoleRequest => {
  return {
    key: "",
    title: "",
    code: "",
  };
};

function Roles() {
  const { data, setData, loading, error, setError } = useRoles();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectRecord, setSelectRecord] = useState<IRole | null>(null);
  const [form, setForm] = useState<IRoleRequest>({
    key: "",
    title: "",
    code: "",
  });

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectRecord(null);
  };

  const openCreateForm = () => {
    setSelectRecord(null);
    setForm(emptyForm());
    setIsFormOpen(true);
  };
  const [formValidation, setFormValidation] =
    useState<IRoleRequest>(emptyForm());
  const validateForm = (): boolean => {
    const errors = emptyForm();

    if (!form.title.trim()) {
      errors.title = "Title is required.";
    } else if (form.title.trim().length <= 3) {
      errors.title = "Title must be at least 3 characters.";
    }

    if (!form.code.trim()) {
      errors.code = "Code is required.";
    } else if (form.code.trim().length <= 3) {
      errors.code = "Code must be at least 3 characters.";
    }

    setFormValidation(errors);
    return !Object.values(errors).some(Boolean);
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (selectRecord) {
        const updatedUser = await roleService.update(selectRecord.key, form);
        setData((model) =>
          model.map((role) =>
            role.key === selectRecord.key
              ? {
                  ...role,
                  ...updatedUser,
                }
              : role,
          ),
        );
      } else {
        const createRecord = await roleService.create(form);
        setData((model) => [...model, createRecord]);
      }

      closeForm();
    } catch (error) {
      console.error(error);
      setError("Failed to save user.");
    }
  };
  const handleRowClick = (user: IRole) => {
    console.log("Row clicked", user);
  };
  const handleView = (model: IRole) => {
    window.alert(`Name: ${model.title}\nCode: ${model.code}`);
  };
  const openEditForm = (record: IRole) => {
    setSelectRecord(record);

    setForm({
      key: record.key,
      title: record.title,
      code: record.code,
    });

    setFormValidation(emptyForm());

    setIsFormOpen(true);
  };
  const handleDelete = async (record: IRole) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${record.title} ${record.code}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await roleService.remove(record.key);

      setData((currentUsers) =>
        currentUsers.filter((item) => item.key !== record.key),
      );
    } catch (error) {
      console.error(error);
      setError("Failed to delete Record.");
    }
  };
  return (
    <AppContainer>
      <AppCard
        title={"Role Management"}
        description={"Manage application roles"}
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
        {isFormOpen ? (
          <form onSubmit={handleSubmit} noValidate>
            <AppContent>
              <AppTitle>{selectRecord ? "Edit Role" : "Create Role"}</AppTitle>
              {error && <div className="app-error">{error}</div>}
              <div className="app-grid">
                <div className="app-width-1-2">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className={`app-form-input ${formValidation.title ? "is-invalid" : ""}`}
                    placeholder="Title"
                    value={form.title}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        title: event.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="app-width-1-2">
                  <label htmlFor="code">Code</label>
                  <input
                    type="text"
                    className={`app-form-input ${formValidation.code ? "is-invalid" : ""}`}
                    placeholder="code"
                    value={form.code}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        code: event.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <AppAction>
                <button type="button" className="app-btn" onClick={closeForm}>
                  Cancel
                </button>

                <button type="submit" className="app-btn success">
                  {selectRecord ? "Update" : "Create"}
                </button>
              </AppAction>
            </AppContent>
          </form>
        ) : (
          ""
        )}
        <AppContent>
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
        </AppContent>
      </AppCard>
    </AppContainer>
  );
}

export default Roles;
