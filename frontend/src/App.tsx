import { useState } from "react";
import "./App.css";
import { CharacterProvider } from "./store/char-context";
import SkillsProvider from "./store/skills-context";
import MainSection from "./components/main-section/MainSection";

function App() {
 const [isAdmin, setIsAdmin] = useState(1);

  return (
    <CharacterProvider>
      <SkillsProvider>
        {isAdmin && <MainSection/>}
      </SkillsProvider>
    </CharacterProvider>
  );
}

export default App;
