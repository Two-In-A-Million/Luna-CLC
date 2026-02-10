import { useState } from "react";
import styles from "../../Modal.module.css";

interface Props {
  statusEffect: any;
  onClose: () => void;
  onSave: (skill: any) => void;
}

const StatusEffectEditorModal: React.FC<Props> = ({ statusEffect, onClose, onSave }) => {
  const [formData, setFormData] = useState(statusEffect);

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
            <h3 className={styles.subHeader}>Status Effect Configuration</h3>
            <label>Status Effect</label>
            <input
              type="string"
              value={formData.status_name}
              onChange={(e) => updateField("status_name", String(e.target.value))}
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

export default StatusEffectEditorModal;
