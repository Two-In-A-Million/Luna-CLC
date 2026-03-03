import { useState } from "react";
import "./App.css";
import { CharacterProvider } from "./store/char-context";
import SkillsProvider from "./store/skills-provider";
import MainSection from "./components/main-section/MainSection";
import AdminLogin from "./components/admin-login/AdminLogin";
import AdminMenu from "./components/admin-menu/AdminMenu";
import { useSecretCommands } from "./hooks/useSecretCommands";

function App() {
  const [adminMode, setAdminMode] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);


  useSecretCommands(["shift", "a", "d", "m"], () => {
    setAdminMode(true);
  });

  const handleLoginSuccess = (token: string) => {
    setAdminToken(token);
  };

  const handleLogout = () => {
    setAdminToken(null);
    setAdminMode(false);
  };

  return (
    <CharacterProvider>
      <SkillsProvider>
       {!adminMode && <MainSection />}

        {adminMode && !adminToken && (
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        )}

        {adminMode && adminToken && (
          <AdminMenu token={adminToken} onExit={handleLogout} />
        )}
      </SkillsProvider>
    </CharacterProvider>
  );
}

export default App;
