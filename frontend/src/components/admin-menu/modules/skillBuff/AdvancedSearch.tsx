import { useState, useEffect } from "react";
import styles from "../../AdvancedSearch.module.css";

interface Props {
  skillBuffs: any[];
  onFilter: (filtered: any[]) => void;
}

const AdvancedSearch: React.FC<Props> = ({ skillBuffs, onFilter }) => {
  const [searchId, setSearchId] = useState("");
  const [searchSkillName, setSearchSkillName] = useState("");

  useEffect(() => {
    let filtered = [...skillBuffs];

    if (searchId) {
      filtered = filtered.filter((s) =>
        String(s.skill_id).includes(searchId)
      );
    }

    if (searchSkillName) {
      filtered = filtered.filter((s) =>
        s.skill_name.toLowerCase().includes(searchSkillName.toLowerCase())
      );
    }

    onFilter(filtered);
  }, [searchId, searchSkillName, skillBuffs]);

  return (
    <div className={styles.searchContainer}>
      <input
        placeholder="Search Skill ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />

      <input
        placeholder="Search Skill Name"
        value={searchSkillName}
        onChange={(e) => setSearchSkillName(e.target.value)}
      />

      <button
        onClick={() => {
          setSearchId("");
          setSearchSkillName("");
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default AdvancedSearch;
