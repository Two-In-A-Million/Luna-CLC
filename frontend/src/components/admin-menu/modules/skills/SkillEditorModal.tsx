import { useState } from "react";
import BasicTab from "./tabs/BasicTab.js";
import BuffTab from "./tabs/BuffTab.js";
import Tooltip from "./tabs/Tooltip.js";
import styles from "../../Modal.module.css";

interface Props {
  skill: any;
  buffList: any[];
  tooltipList: any[];
  onClose: () => void;
  onSave: (skill: any) => void;
}

const SkillEditorModal: React.FC<Props> = ({ skill, buffList, tooltipList, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState(skill);

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>

        <div className={styles.tabHeader}>
          <button
            className={activeTab === "basic" ? styles.active : ""}
            onClick={() => setActiveTab("basic")}
          >
            Basic
          </button>
          <button
            className={activeTab === "buff" ? styles.active : ""}
            onClick={() => setActiveTab("buff")}
          >
            Buff
          </button>
          <button
            className={activeTab === "toolTip" ? styles.active : ""}
            onClick={() => setActiveTab("toolTip")}
          >
            Tooltip
          </button>
        </div>

        {activeTab === "basic" && (
          <BasicTab data={formData} onChange={updateField} />
        )}

        {activeTab === "toolTip" && (
          <Tooltip data={formData} tooltipList={tooltipList} onChange={updateField} />
        )}

        {activeTab === "buff" && (
          <BuffTab data={formData} buffList={buffList} onChange={updateField} />
        )}

        <div className={styles.modalActions}>
          <button onClick={() => onSave(formData)}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>

      </div>
    </div>
  );
};

export default SkillEditorModal;
