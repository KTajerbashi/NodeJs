import "./AppFormError.css";
interface AppFormErrorProps {
  error?: string | null;
}

function AppFormError({ error }: AppFormErrorProps) {
  if (!error) {
    return;
  }
  return <div className="app-error">{error}</div>;
}

export default AppFormError;
