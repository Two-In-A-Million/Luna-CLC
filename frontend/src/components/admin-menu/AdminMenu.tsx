import { useState } from "react";
import styles from "./AdminMenu.module.css";
import SkillsPage from "./modules/skills/SkillsPage";
import JobsPage from "./modules/jobs/JobsPage";
import TooltipsPage from "./modules/tooltip/TooltipsPage";
import StatusEffectPage from "./modules/statusEffect/StatusEffectPage";
import SkillBuffPage from "./modules/skillBuff/SkillBuffPage";
// import JobSkills from "./modules/JobSkills";

interface AdminMenuProps {
  onExit: () => void;
  token: string;
}

const AdminMenu: React.FC<AdminMenuProps> = ({ onExit }) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className={styles.adminContainer}>
      {/* SIDEBAR */}
      <aside className={styles.adminSidebar}>
        <div className={styles.sidebarBrand}>LUNA ADMIN</div>

        <nav className={styles.sidebarNav}>
          <button
            className={`${styles.navButton} ${
              activeTab === "jobs" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("jobs")}
          >
            Job List
          </button>

          <button
            className={`${styles.navButton} ${
              activeTab === "jobSkills" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("jobSkills")}
          >
            Job Skill
          </button>

          <button
            className={`${styles.navButton} ${
              activeTab === "skills" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("skills")}
          >
            Skills
          </button>

          <button
            className={`${styles.navButton} ${
              activeTab === "skillBuff" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("skillBuff")}
          >
            Skill Buff
          </button>

          <button
            className={`${styles.navButton} ${
              activeTab === "statusEffect" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("statusEffect")}
          >
            Status Effect
          </button>

          <button
            className={`${styles.navButton} ${
              activeTab === "tooltip" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("tooltip")}
          >
            Tooltip
          </button>
        </nav>

        <button className={styles.sidebarExit} onClick={onExit}>
          Return to App
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className={styles.adminMain}>
        {activeTab === "jobs" && <JobsPage />}
        {/* {activeTab === "jobSkills" && <JobSkills />} */}
        {activeTab === "skills" && <SkillsPage />}
        {activeTab === "skillBuff" && <SkillBuffPage />}
        {activeTab === "statusEffect" && <StatusEffectPage />}
        {activeTab === "tooltip" && <TooltipsPage />}
      </main>
    </div>
  );
};

export default AdminMenu;
