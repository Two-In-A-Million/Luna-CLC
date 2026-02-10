import { useState, useEffect } from "react";
import SkillTable from "./SkillTable";
import SkillEditorModal from "./SkillEditorModal";
import { apiFetch } from "../../../../utils/api";
import AdvancedSearch from "./AdvancedSearch";


const SkillsPage = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<any[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<any | null>(null);
  const [buffList, setBuffList] = useState<any[]>([]);
  const [tooltipList, setTooltipList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [skillsData, buffData, skillsTooltip] = await Promise.all([
          apiFetch("/skills"),
          apiFetch("/skills-buff"),
          apiFetch("/skills-tooltip"),
        ]);

        setSkills(skillsData);
        setFilteredSkills(skillsData);
        setTooltipList(skillsTooltip);
        setBuffList(buffData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleEdit = (skill: any) => {
    setSelectedSkill(skill);
  };

  const handleClose = () => {
    setSelectedSkill(null);
  };

  const handleSave = async (updatedSkill: any) => {
    await apiFetch(`/skills/${updatedSkill.skill_idx}`, {
      method: "PUT",
      body: JSON.stringify(updatedSkill),
    });

    // refresh list
    const refreshed = await apiFetch("/skills");
    setSkills(refreshed);
    setFilteredSkills(refreshed);

    handleClose();
  };

  if (loading) {
    return (
      <div style={{ padding: "3rem", fontSize: "2rem", textAlign: "center" }}>
        Loading skill data...
      </div>
    );
  }

  return (
    <>
      <AdvancedSearch
        skills={skills}
        onFilter={setFilteredSkills}
      />
      <SkillTable skills={filteredSkills} onEdit={handleEdit} />

      {selectedSkill && (
        <SkillEditorModal
          skill={selectedSkill}
          buffList={buffList}
          tooltipList={tooltipList}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default SkillsPage;
