import { useState } from "react";
import styles from '../../Table.module.css';

interface Props {
  tooltips: any[];
  onEdit: (tooltip: any) => void;
}

const ITEMS_PER_PAGE = 10;

const TooltipTable: React.FC<Props> = ({ tooltips, onEdit }) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalPages = Math.ceil(tooltips.length / ITEMS_PER_PAGE);

    const paginatedTooltip = tooltips.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  return (
    <div className={styles.Container}>
      <h1 className={styles.title}>Tooltip</h1>
      <div className={styles.tableWrapper}>
        <table className={styles.Table}>
          <thead>
            <tr className={styles.tableColumn}>
              <th>Skill Id</th>
              <th>Tooltip</th>
              <th>Actions</th>
            </tr>
          </thead>
            <tbody>
              {paginatedTooltip.map((tooltip) => (
                <tr key={tooltip.skill_id} className={styles.tableColumn}>
                  <td>{tooltip.skill_id}</td>
                  <td>{tooltip.skill_tooltip}</td>
                  <td>
                    <button onClick={() => onEdit(tooltip)}>Edit</button>
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

export default TooltipTable;
