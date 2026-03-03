import { useState, useEffect } from "react";
import styles from "../../AdvancedSearch.module.css";

interface Props {
  tooltips: any[];
  onFilter: (filtered: any[]) => void;
}

const AdvancedSearch: React.FC<Props> = ({ tooltips, onFilter }) => {
  const [searchId, setSearchId] = useState("");
  const [searchTooltip, setSearchTooltip] = useState("");

  useEffect(() => {
    let filtered = [...tooltips];

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
  }, [searchId, searchTooltip, tooltips]);

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
