import { useState } from "react";
import styles from "../../Modal.module.css";
import SearchableSelect from "../../../searchable-select/SearchableSelect";

interface Props {
  jobSkill: any;
  jobs: any;
  skills: any;
  onClose: () => void;
  onSave: (jobSkill: any) => void;
}

const JobSkillEditorModal: React.FC<Props> = ({ jobSkill, jobs, skills, onClose, onSave }) => {
  const [formData, setFormData] = useState(jobSkill);
  const [originalData] = useState(jobSkill);

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  
  const renderJobs = () => {

    return (
      <div className={styles.buffRow}>
        <SearchableSelect
            data={jobs}
            valueKey="job_id"
            labelKey="job_name"
            value={formData.job_id}
            onChange={(val) => updateField("job_id", val)}
            placeholder={`Search jobs`}
        />
        </div>
    );
  }

  const renderSkills = () => {

    return (
      <div className={styles.buffRow}>
        <SearchableSelect
            data={skills}
            valueKey="skill_idx"
            labelKey="skill_name"
            value={formData.skill_id}
            onChange={(val) => updateField("skill_id", Number(val))}
            placeholder={`Search skills`}
        />
        </div>
    );
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>

        <div>
          <div >
            <h3 className={styles.subHeader}>Skill Buff Configuration</h3>
            <label>Job</label>
            {renderJobs()}
            <label>Skill</label>
            {renderSkills()}
          </div>
        </div>

        <div className={styles.modalActions}>
          <button onClick={() => onSave(
            {
              old_skill_id: originalData.skill_id,
              old_job_id: originalData.job_id,
              new_skill_id: formData.skill_id,
              new_job_id: formData.job_id
            }
          )}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>

      </div>
    </div>
  );
};

export default JobSkillEditorModal;
