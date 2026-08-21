import "./AppFormError.css";

interface AppFormErrorProps {
  message?: string;
  invalid: boolean;
}

function AppFormError({ message, invalid }: AppFormErrorProps) {
  if (!invalid) {
    return;
  }
  if (!message) {
    return;
  }
  return <div className="app-form-error">{message}</div>;
}

export default AppFormError;
