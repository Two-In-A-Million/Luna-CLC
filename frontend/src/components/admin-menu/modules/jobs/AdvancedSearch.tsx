import { useState, useEffect } from "react";
import styles from "../../AdvancedSearch.module.css";

interface Props {
  jobs: any[];
  onFilter: (filtered: any[]) => void;
}

const AdvancedSearch: React.FC<Props> = ({ jobs, onFilter }) => {
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchRace, setSearchRace] = useState("");
  const [searchLevel, setSearchLevel] = useState("");

  useEffect(() => {
    let filtered = [...jobs];

    if (searchId) {
      filtered = filtered.filter((s) =>
        String(s.job_id).includes(searchId)
      );
    }

    if (searchName) {
      filtered = filtered.filter((s) =>
        s.job_name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchRace) {
      filtered = filtered.filter((s) =>
        s.race.toLowerCase().includes(searchRace.toLowerCase())
      );
    }

    if (searchLevel) {
      filtered = filtered.filter(
        (s) => Number(s.level) == Number(searchLevel)
      );
    }

    onFilter(filtered);
  }, [searchId, searchName, searchRace, searchLevel, jobs]);

  return (
    <div className={styles.searchContainer}>
      <input
        placeholder="Search Job ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />

      <input
        placeholder="Search Job Name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />

      <input
        placeholder="Search Race"
        value={searchRace}
        onChange={(e) => setSearchRace(e.target.value)}
      />

      <input
        type="number"
        placeholder="Level"
        value={searchLevel}
        onChange={(e) => setSearchLevel(e.target.value)}
      />

      <button
        onClick={() => {
          setSearchId("");
          setSearchName("");
          setSearchName("");
          setSearchLevel("");
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default AdvancedSearch;
