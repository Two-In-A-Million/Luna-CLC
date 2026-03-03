import { useState, useEffect } from "react";
import JobSkillTable from "./JobSkillsTable";
import JobSKillEditorModal from "./JobSKillEditorModal";
import { apiFetch } from "../../../../utils/api";
import AdvancedSearch from "./AdvancedSearch";


const jobSkillsPage = () => {
  const [jobSkills, setJobSkills] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [filteredJobSkill, setFilteredJobSkill] = useState<any[]>([]);
  const [selectedJobSkill, setSelectedJobSKill] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [jobSkillData, jobData, skillData] = await Promise.all([
          apiFetch("/job-skills"),
          apiFetch("/jobs"),
          apiFetch("/skills"),
        ]);

        setJobSkills(jobSkillData);
        setJobs(jobData);
        setSkills(skillData);
        setFilteredJobSkill(jobSkillData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleEdit = (jobSkill: any) => {
    setSelectedJobSKill(jobSkill);
  };

  const handleClose = () => {
    setSelectedJobSKill(null);
  };

  const handleSave = async (updateJobSkill: any) => {
    await apiFetch("/job-skills", {
      method: "PUT",
      body: JSON.stringify(updateJobSkill),
    });

    // refresh list
    const refreshed = await apiFetch("/job-skills");
    setJobSkills(refreshed);
    setFilteredJobSkill(refreshed);

    handleClose();
  };

  if (loading) {
    return (
      <div style={{ padding: "3rem", fontSize: "2rem", textAlign: "center" }}>
        Loading job skill data...
      </div>
    );
  }

  return (
    <>
      <AdvancedSearch
        jobSkills={jobSkills}
        onFilter={setFilteredJobSkill}
      />
      <JobSkillTable jobSkills={filteredJobSkill} onEdit={handleEdit} />

      {selectedJobSkill && (
        <JobSKillEditorModal
          jobSkill={selectedJobSkill}
          jobs={jobs}
          skills={skills}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </>
  );
}
export default jobSkillsPage;
