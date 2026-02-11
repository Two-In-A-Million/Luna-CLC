import { useState } from "react";
import styles from '../../Table.module.css';

interface Props {
  statusEffects: any[];
  onEdit: (statusEffect: any) => void;
}

const ITEMS_PER_PAGE = 10;

const StatusEffectTable: React.FC<Props> = ({ statusEffects, onEdit }) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalPages = Math.ceil(statusEffects.length / ITEMS_PER_PAGE);

    const paginatedStatusEffect = statusEffects.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  return (
    <div className={styles.Container}>
      <h1 className={styles.title}>Status Effect</h1>
      <div className={styles.tableWrapper}>
        <table className={styles.Table}>
          <thead>
            <tr className={styles.tableColumn}>
              <th>Status ID</th>
              <th>Status Name</th>
              <th>Actions</th>
            </tr>
          </thead>
            <tbody>
              {paginatedStatusEffect.map((statusEffect) => (
                <tr key={statusEffect.status_id} className={styles.tableColumn}>
                  <td>{statusEffect.status_id}</td>
                  <td>{statusEffect.status_name}</td>
                  <td>
                    <button onClick={() => onEdit(statusEffect)}>Edit</button>
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

export default StatusEffectTable;
