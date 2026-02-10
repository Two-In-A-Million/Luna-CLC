import { useState, useEffect } from "react";
import JobTable from "./JobTable";
import JobEditorModal from "./JobEditorModal";
import { apiFetch } from "../../../../utils/api";
import AdvancedSearch from "./AdvancedSearch";


const JobsPage = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [jobsData] = await Promise.all([
          apiFetch("/jobs"),
        ]);

        setJobs(jobsData);
        setFilteredJobs(jobsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleEdit = (job: any) => {
    setSelectedJobs(job);
  };

  const handleClose = () => {
    setSelectedJobs(null);
  };

  const handleSave = async (updateJob: any) => {
    await apiFetch(`/jobs/${updateJob.job_id}`, {
      method: "PUT",
      body: JSON.stringify(updateJob),
    });

    // refresh list
    const refreshed = await apiFetch("/jobs");
    setJobs(refreshed);
    setFilteredJobs(refreshed);

    handleClose();
  };

  if (loading) {
    return (
      <div style={{ padding: "3rem", fontSize: "2rem", textAlign: "center" }}>
        Loading job data...
      </div>
    );
  }

  return (
    <>
      <AdvancedSearch
        jobs={jobs}
        onFilter={setFilteredJobs}
      />
      <JobTable jobs={filteredJobs} onEdit={handleEdit} />

      {selectedJobs && (
        <JobEditorModal
          job={selectedJobs}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default JobsPage;
