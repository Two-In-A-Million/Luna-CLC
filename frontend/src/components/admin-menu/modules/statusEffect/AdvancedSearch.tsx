import { useState, useEffect } from "react";
import styles from "../../AdvancedSearch.module.css";

interface Props {
  statusEffects: any[];
  onFilter: (filtered: any[]) => void;
}

const AdvancedSearch: React.FC<Props> = ({ statusEffects, onFilter }) => {
  const [searchId, setSearchId] = useState("");
  const [searchTooltip, setSearchTooltip] = useState("");

  useEffect(() => {
    let filtered = [...statusEffects];

    if (searchId) {
      filtered = filtered.filter((s) =>
        String(s.job_id).includes(searchId)
      );
    }

    if (searchTooltip) {
      filtered = filtered.filter((s) =>
        s.job_name.toLowerCase().includes(searchTooltip.toLowerCase())
      );
    }

    onFilter(filtered);
  }, [searchId, searchTooltip, statusEffects]);

  return (
    <div className={styles.searchContainer}>
      <input
        placeholder="Search Skill ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />

      <input
        placeholder="Search Tooltip"
        value={searchTooltip}
        onChange={(e) => setSearchTooltip(e.target.value)}
      />

      <button
        onClick={() => {
          setSearchId("");
          setSearchTooltip("");
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default AdvancedSearch;
