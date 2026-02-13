import { useState, useEffect } from "react";
import SkillBuffTable from "./SkillBuffTable";
import SkillBuffEditorModal from "./SkillBuffEditorModal";
import { apiFetch } from "../../../../utils/api";
import AdvancedSearch from "./AdvancedSearch";


const SkillBuffPage = () => {
  const [skillBuffs, setSkillBuffs] = useState<any[]>([]);
  const [filteredSkillBuff, setFilteredSkillBuff] = useState<any[]>([]);
  const [selectedSkillBuff, setSelectedSkillBuff] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [skillBuffData] = await Promise.all([
          apiFetch("/skills-buff"),
        ]);

        setSkillBuffs(skillBuffData);
        setFilteredSkillBuff(skillBuffData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleEdit = (skillBuff: any) => {
    setSelectedSkillBuff(skillBuff);
  };

  const handleClose = () => {
    setSelectedSkillBuff(null);
  };

  const handleSave = async (updateSkillBuff: any) => {
    await apiFetch(`/skills-buff/${updateSkillBuff.skill_idx}`, {
      method: "PUT",
      body: JSON.stringify(updateSkillBuff),
    });

    // refresh list
    const refreshed = await apiFetch("/skills-buff");
    setSkillBuffs(refreshed);
    setFilteredSkillBuff(refreshed);

    handleClose();
  };

  if (loading) {
    return (
      <div style={{ padding: "3rem", fontSize: "2rem", textAlign: "center" }}>
        Loading skill buff data...
      </div>
    );
  }

  return (
    <>
      <AdvancedSearch
        skillBuffs={skillBuffs}
        onFilter={setFilteredSkillBuff}
      />
      <SkillBuffTable skillBuffs={filteredSkillBuff} onEdit={handleEdit} />

      {selectedSkillBuff && (
        <SkillBuffEditorModal
          skillBuff={selectedSkillBuff}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </>
  );
}
export default SkillBuffPage;
