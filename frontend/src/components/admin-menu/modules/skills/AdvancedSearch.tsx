import { useState, useEffect } from "react";
import styles from "../../../AdvancedSearch.module.css";


interface Props {
  skills: any[];
  onFilter: (filtered: any[]) => void;
}

const AdvancedSearch: React.FC<Props> = ({ skills, onFilter }) => {
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [minCooldown, setMinCooldown] = useState("");
  const [minLevel, setMinLevel] = useState("");

  useEffect(() => {
    let filtered = [...skills];

    if (searchId) {
      filtered = filtered.filter((s) =>
        String(s.skill_idx).includes(searchId)
      );
    }

    if (searchName) {
      filtered = filtered.filter((s) =>
        s.skill_name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (minLevel) {
      filtered = filtered.filter(
        (s) => Number(s.skill_level) >= Number(minLevel)
      );
    }

    onFilter(filtered);
  }, [searchId, searchName, minCooldown, minLevel, skills]);

  return (
    <div className={styles.searchContainer}>
      <input
        placeholder="Search Skill ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />

      <input
        placeholder="Search Name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Min Level"
        value={minLevel}
        onChange={(e) => setMinLevel(e.target.value)}
      />

      <button
        onClick={() => {
          setSearchId("");
          setSearchName("");
          setMinCooldown("");
          setMinLevel("");
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default AdvancedSearch;
