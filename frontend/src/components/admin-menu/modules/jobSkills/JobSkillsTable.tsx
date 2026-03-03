import { useEffect, useState } from "react";
import styles from '../../Table.module.css';

interface Props {
  jobSkills: any[];
  onEdit: (jobSkill: any) => void;
}

const ITEMS_PER_PAGE = 10;

const JobSkillTable: React.FC<Props> = ({ jobSkills, onEdit }) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalPages = Math.ceil(jobSkills.length / ITEMS_PER_PAGE);

    const paginatedJobSkills = jobSkills.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  return (
    <div className={styles.Container}>
      <h1 className={styles.title}>Job Skill</h1>
      <div className={styles.tableWrapper}>
        <table className={styles.Table}>
          <thead>
            <tr className={styles.tableColumn}>
              <th>Job Name</th>
              <th>Skill Name</th>
              <th>Status</th>
              <th>Race</th>
            </tr>
          </thead>
            <tbody>
              {paginatedJobSkills.map((jobSkill) => (
                <tr key={`${jobSkill.job_id}-${jobSkill.skill_id}`} className={styles.tableColumn}>
                  <td>{jobSkill.job_name}</td>
                  <td>{jobSkill.skill_name}</td>
                  <td>{jobSkill.race}</td>
                  <td>
                    <button onClick={() => onEdit(jobSkill)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
        <div className={styles.pagination}>
          <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
          >
              ◀ Prev
          </button>

          <span>
              Page {currentPage} / {totalPages}
          </span>

          <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
          >
              Next ▶
          </button>
        </div>
      </div>
  );
};

export default JobSkillTable;
