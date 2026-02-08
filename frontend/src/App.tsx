import { useState } from "react";
import "./App.css";
import { CharacterProvider } from "./store/char-context";
import SkillsProvider from "./store/skills-context";
import MainSection from "./components/main-section/MainSection";
import AdminMenu from "./components/admin-menu/AdminMenu";
import { useSecretCommands } from "./hooks/useSecretCommands";

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  // LOG HERE: This will run every time the component re-renders
  console.log("RENDER - Admin Visibility is currently:", showAdmin);

  useSecretCommands(["shift", "a", "d", "m"], () => {
    setShowAdmin((v) => !v);
  });

  return (
    <CharacterProvider>
      <SkillsProvider>
        {!showAdmin ? (
            <MainSection />
          ) : (
            <AdminMenu onExit={() => setShowAdmin(false)} />
          )}
      </SkillsProvider>
    </CharacterProvider>
  );
}

export default App;
