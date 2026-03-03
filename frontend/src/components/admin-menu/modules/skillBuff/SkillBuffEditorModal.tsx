import { useState } from "react";
import styles from "../../Modal.module.css";

interface Props {
  skillBuff: any;
  onClose: () => void;
  onSave: (skill: any) => void;
}

const SkillBuffEditorModal: React.FC<Props> = ({ skillBuff, onClose, onSave }) => {
  const [formData, setFormData] = useState(skillBuff);

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
            <h3 className={styles.subHeader}>Skill Buff Configuration</h3>
            <label>Skill Name</label>
            <input
              type="string"
              value={formData.skill_name}
              onChange={(e) => updateField("skill_name", String(e.target.value))}
            />
            <label>Tooltip</label>
            <input
              type="string"
              value={formData.skill_tooltip}
              onChange={(e) => updateField("skill_tooltip", String(e.target.value))}
            />
            <label>Status</label>
            <input
              type="string"
              value={formData.status_id}
              onChange={(e) => updateField("status_id", String(e.target.value))}
            />
            <label>Status Data</label>
            <input
              type="string"
              value={formData.status_data_value}
              onChange={(e) => updateField("status_data_value", String(e.target.value))}
            />
              <label>Delay Time</label>
            <input
              type="string"
              value={formData.delay_time}
              onChange={(e) => updateField("delay_time", String(e.target.value))}
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

export default SkillBuffEditorModal;
