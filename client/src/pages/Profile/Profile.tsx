import { useState } from "react";
import { AppAction } from "../../components/AppActions/AppActions";
import { AppCard } from "../../components/AppCard/AppCard";
import { AppContainer } from "../../components/AppContainer/AppContainer";
import { AppContent } from "../../components/AppContent/AppContent";
import authService from "../../services/authService";

import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState<IUser>();
  const [auth, setAuth] = useState<boolean>();
  const onSignUp = () => {
    const response = authService.signup({} as IUser);
    console.log("[onSignUp] ", response);
  };
  const onLogin = () => {
    const response = authService.login(
      "kamran_tajerbashi@mail.com",
      "123123123",
    );
    console.log("[onLogin] ", response);
  };
  const onCurrentUser = async () => {
    const response = await authService.getCurrentUser();
    setProfile(response);
    console.log("[onCurrentUser] ", response);
  };
  const onIsAuthentication = async () => {
    const response = await authService.isAuthentication();
    console.log("[onIsAuthentication] ", response);
    setAuth(response);
  };

  return (
    <AppContainer>
      <AppCard title="Profile">
        <AppContent>
          <div>
            <strong>IsAuthentication</strong> : {auth ? "✅" : "❌"}
          </div>
        </AppContent>
        <AppContent>
          <div>
            <strong>Key</strong> : {profile?.key}
          </div>
          <div>
            <strong>FirstName</strong> : {profile?.firstName}
          </div>
          <div>
            <strong>LastName</strong> : {profile?.lastName}
          </div>
          <div>
            <strong>Email</strong> : {profile?.email}
          </div>
        </AppContent>
        <AppAction>
          <button onClick={onSignUp} className="app-btn primary">
            Signup
          </button>
          <button onClick={onLogin} className="app-btn success">
            Login
          </button>
          <button onClick={onCurrentUser} className="app-btn info">
            CurrentUser
          </button>
          <button onClick={onIsAuthentication} className="app-btn warning">
            IsAuthenticated
          </button>
        </AppAction>
      </AppCard>
    </AppContainer>
  );
}
export default Profile;
