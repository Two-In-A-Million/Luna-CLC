import { useState, useEffect } from "react";
import styles from "../../AdvancedSearch.module.css";

interface Props {
  jobSkills: any[];
  onFilter: (filtered: any[]) => void;
}

const AdvancedSearch: React.FC<Props> = ({ jobSkills, onFilter }) => {
  const [searchSkillName, setSearchSkillName] = useState("");
  const [searchJobName, setSearchJobName] = useState("");

  useEffect(() => {
    let filtered = [...jobSkills];  

    if (searchSkillName) {
      filtered = filtered.filter((s) =>
        s.skill_name.toLowerCase().includes(searchSkillName.toLowerCase())
      );
    }

    if (searchJobName) {
      filtered = filtered.filter((s) =>
        s.job_name.toLowerCase().includes(searchJobName.toLowerCase())
      );
    }

    onFilter(filtered);
  }, [searchSkillName, searchJobName, jobSkills])
  
  return (
    <div className={styles.searchContainer}>
      <input
        placeholder="Search Skill Name"
        value={searchSkillName}
        onChange={(e) => setSearchSkillName(e.target.value)}
      />

      <input
        placeholder="Search Job Name"
        value={searchJobName}
        onChange={(e) => setSearchJobName(e.target.value)}
      />

      <button
        onClick={() => {
          setSearchSkillName("");
          setSearchJobName("");
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default AdvancedSearch;
