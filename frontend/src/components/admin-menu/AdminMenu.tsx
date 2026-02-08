import { useState } from "react";
import styles from "./AdminMenu.module.css";

interface AdminMenuProps {
  onExit: () => void;
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
              activeTab === "dashboard" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={`${styles.navButton} ${
              activeTab === "skills" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("skills")}
          >
            Skill Editor
          </button>

          <button
            className={`${styles.navButton} ${
              activeTab === "stats" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("stats")}
          >
            Character Stats
          </button>
        </nav>

        <button className={styles.sidebarExit} onClick={onExit}>
          Return to App
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className={styles.adminMain}>
        {activeTab === "dashboard" && (
          <div className={styles.adminView}>
            <h1>Dashboard</h1>
            <p>
              Welcome to the system backend. Select a category from the sidebar
              to begin.
            </p>
          </div>
        )}

        {activeTab === "skills" && (
          <div className={styles.adminView}>
            <h1>Skill Editor</h1>
            <div className={styles.adminActions}>
              <button className={styles.retroBtn}>Reset All SP</button>
              <button className={styles.retroBtn}>
                Unlock All Skill Tiers
              </button>
            </div>
          </div>
        )}

        {activeTab === "stats" && (
          <div className={styles.adminView}>
            <h1>Character Stats</h1>
            <div className={styles.adminActions}>
              <button className={styles.retroBtn}>Set Max Level</button>
              <button className={styles.retroBtn}>
                Add 1,000,000 Gold
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminMenu;
