import { useState } from "react";
import styles from "../../Modal.module.css";

interface Props {
  tooltip: any;
  onClose: () => void;
  onSave: (skill: any) => void;
}

const TooltipEditorModal: React.FC<Props> = ({ tooltip, onClose, onSave }) => {
  const [formData, setFormData] = useState(tooltip);

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
            <h3 className={styles.subHeader}>Tooltip Configuration</h3>
            <label>Tooltip</label>
            <input
              type="string"
              value={formData.skill_tooltip}
              onChange={(e) => updateField("skill_tooltip", String(e.target.value))}
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

export default TooltipEditorModal;
