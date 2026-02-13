import { useState } from "react";
import styles from '../../Table.module.css';

interface Props {
  skillBuffs: any[];
  onEdit: (skillBuff: any) => void;
}

const ITEMS_PER_PAGE = 10;

const SkillBuffTable: React.FC<Props> = ({ skillBuffs, onEdit }) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalPages = Math.ceil(skillBuffs.length / ITEMS_PER_PAGE);

    const paginatedSkillBuff = skillBuffs.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  return (
    <div className={styles.Container}>
      <h1 className={styles.title}>Skill Buff</h1>
      <div className={styles.tableWrapper}>
        <table className={styles.Table}>
          <thead>
            <tr className={styles.tableColumn}>
              <th>Status ID</th>
              <th>Tooltip ID</th>
              <th>Skill Name</th>
              <th>Status</th>
              <th>Status Data</th>
              <th>Delay Time</th>
              <th>Actions</th>
            </tr>
          </thead>
            <tbody>
              {paginatedSkillBuff.map((skillBuff) => (
                <tr key={skillBuff.skill_idx} className={styles.tableColumn}>
                  <td>{skillBuff.skill_idx}</td>
                  <td>{skillBuff.skill_tooltip}</td>
                  <td>{skillBuff.skill_name}</td>
                  <td>{skillBuff.status_name}</td>
                  <td>{skillBuff.status_data_value}</td>
                  <td>{skillBuff.delay_time}</td>
                  <td>
                    <button onClick={() => onEdit(skillBuff)}>Edit</button>
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

export default SkillBuffTable;
