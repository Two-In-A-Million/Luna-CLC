import { useState } from "react";
import styles from "../../Modal.module.css";

interface Props {
  job: any;
  onClose: () => void;
  onSave: (skill: any) => void;
}

const JobEditorModal: React.FC<Props> = ({ job, onClose, onSave }) => {
  const [formData, setFormData] = useState(job);

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>

        <div>
          <div >
            <h3 className={styles.subHeader}>Job Configuration</h3>
            <label>Job Name</label>
            <input
              type="string"
              value={formData.job_name}
              onChange={(e) => updateField("job_name", String(e.target.value))}
            />
            <label>Race</label>
            <input
              type="string"
              value={formData.race}
              onChange={(e) => updateField("race", String(e.target.value))}
            />
            
            <label>Level</label>
            <input
              type="number"
              value={formData.level}
              onChange={(e) => updateField("level", Number(e.target.value))}
            />
          </div>
        </div>

        <div className={styles.modalActions}>
          <button onClick={() => onSave(formData)}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>

      </div>
    </div>
  );
};

export default JobEditorModal;
