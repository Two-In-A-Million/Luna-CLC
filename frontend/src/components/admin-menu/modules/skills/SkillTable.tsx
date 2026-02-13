import { useState } from "react";
import styles from '../../Table.module.css';

interface SkillTableProps {
  skills: any[];
  onEdit: (skill: any) => void;
}

    const ITEMS_PER_PAGE = 10;


const SkillTable: React.FC<SkillTableProps> = ({ skills, onEdit }) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalPages = Math.ceil(skills.length / ITEMS_PER_PAGE);

    const paginatedSkills = skills.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    const getSkillLevelId = (id: number) => id % 100;


  return (
    <div className={styles.Container}>
      <h1 className={styles.title}>Skills</h1>
      <div className={styles.tableWrapper}>
        <table className={styles.Table}>
          <thead>
            <tr className={styles.tableColumn}>
              <th>ID</th>
              <th>Name</th>
              <th>Level</th>
              <th>Actions</th>
            </tr>
          </thead>
            <tbody>
              {paginatedSkills.map((skill) => (
                <tr key={skill.skill_idx} className={styles.tableColumn}>
                  <td>{skill.skill_idx}</td>
                  <td>{skill.skill_name}</td>
                  <td>{getSkillLevelId(skill.skill_idx)}</td>
                  <td>
                    <button onClick={() => onEdit(skill)}>Edit</button>
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

export default SkillTable;
