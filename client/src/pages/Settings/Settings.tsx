import { useState, type FormEvent } from "react";
import { AppCard } from "../../components/AppCard/AppCard";
import { AppContainer } from "../../components/AppContainer/AppContainer";
import { AppContent } from "../../components/AppContent/AppContent";
import { AppTitle } from "../../components/AppTitle/AppTitle";
import "./Settings.css";
import { AppAction } from "../../components/AppActions/AppActions";
import DataGrid from "../../components/DataGrid/DataGrid";
import useSettings from "../../hooks/useSettings";
import settingService from "../../services/settingService";
import AppFormError from "../../components/AppFormError/AppFormError";
import AppGrid from "../../components/AppGrid/AppGrid";
import AppGridItem from "../../components/AppGridItem/AppGridItem";
import AppFormControlError from "../../components/AppFormControlError/AppFormControlError";

const columns = [
  {
    key: "title",
    title: "Title",
  },
  {
    key: "value",
    title: "Value",
  },
] as const;

const emptyForm = (): ISettingRequest => {
  return {
    key: "",
    title: "",
    value: "",
  };
};

function Settings() {
  const { data, setData, loading, error, setError } = useSettings();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectRecord, setSelectRecord] = useState<ISetting | null>(null);
  const [form, setForm] = useState<ISettingRequest>(emptyForm());
  const [formValidation, setFormValidation] =
    useState<ISettingRequest>(emptyForm());

  const openCreateForm = () => {
    setSelectRecord(null);
    setForm(emptyForm());
    setIsFormOpen(true);
  };
  const closeForm = () => {
    setIsFormOpen(false);
    setSelectRecord(null);
  };
  const validateForm = (): boolean => {
    const errors = emptyForm();

    if (!form.title.trim()) {
      errors.title = "Title is required.";
    } else if (form.title.trim().length <= 3) {
      errors.title = "Title must be at least 3 characters.";
    }

    if (!form.value.trim()) {
      errors.value = "Value is required.";
    } else if (form.value.trim().length <= 3) {
      errors.value = "Value must be at least 3 characters.";
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
        const updatedUser = await settingService.onUpdate(
          selectRecord.key,
          form,
        );
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
        const response = await settingService.onCreate<
          ISettingRequest,
          ISetting
        >("", form);
        setData((model) => [...model, response.data]);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to save user.");
    }
  };
  const openEditForm = (record: ISetting) => {
    console.log("Row clicked", record);
  };
  const handleRowClick = (record: ISetting) => {
    console.log("Row clicked", record);
  };
  const handleDelete = (record: ISetting) => {
    console.log("Row clicked", record);
  };

  const handleView = (record: ISetting) => {
    window.alert(`Title: ${record.title}\nValue: ${record.value}`);
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

  return (
    <AppContainer>
      <AppCard
        title={"Setting Management"}
        description={"Manage application setting"}
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
              <AppTitle>
                {selectRecord ? "Edit Setting" : "Create Setting"}
              </AppTitle>
              <AppFormError key={"form"} error={error} />

              <AppGrid>
                <AppGridItem className="app-width-1-2">
                  <label htmlFor="title">Title</label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    className={`app-form-input ${formValidation.title ? "is-invalid" : ""}`}
                    onChange={handleChange}
                  />
                  <AppFormControlError
                    invalid={formValidation.title.length > 0}
                    message={formValidation.title}
                  />
                </AppGridItem>
                <AppGridItem className="app-width-1-2">
                  <label htmlFor="value">Value</label>
                  <input
                    id="value"
                    type="text"
                    name="value"
                    placeholder="Value"
                    value={form.value}
                    className={`app-form-input ${formValidation.value ? "is-invalid" : ""}`}
                    onChange={handleChange}
                  />
                  <AppFormControlError
                    invalid={formValidation.value.length > 0}
                    message={formValidation.value}
                  />
                </AppGridItem>
              </AppGrid>

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
export default Settings;
