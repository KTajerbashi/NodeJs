import "./AppFormControlError.css";

interface AppFormControlErrorProps {
  message?: string;
  invalid: boolean;
}

function AppFormControlError({ message, invalid }: AppFormControlErrorProps) {
  if (!invalid) {
    return;
  }
  if (!message) {
    return;
  }
  return <div className="app-form-control-error">{message}</div>;
}

export default AppFormControlError;
