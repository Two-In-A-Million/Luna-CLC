import { useState } from "react";
import styles from '../../Table.module.css';

interface JobsTableProps {
  jobs: any[];
  onEdit: (job: any) => void;
}

    const ITEMS_PER_PAGE = 10;


const JobTable: React.FC<JobsTableProps> = ({ jobs, onEdit }) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);

    const paginatedJobs = jobs.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  return (
    <div className={styles.Container}>
      <h1 className={styles.title}>Jobs</h1>
      <div className={styles.tableWrapper}>
        <table className={styles.Table}>
          <thead>
            <tr className={styles.tableColumn}>
              <th>ID</th>
              <th>Name</th>
              <th>Race</th>
              <th>Level</th>
              <th>Actions</th>
            </tr>
          </thead>
            <tbody>
              {paginatedJobs.map((job) => (
                <tr key={job.job_id} className={styles.tableColumn}>
                  <td>{job.job_id}</td>
                  <td>{job.job_name}</td>
                  <td>{job.race}</td>
                  <td>{job.level}</td>
                  <td>
                    <button onClick={() => onEdit(job)}>Edit</button>
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

export default JobTable;
