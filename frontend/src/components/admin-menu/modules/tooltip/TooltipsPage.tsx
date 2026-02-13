import { useState, useEffect } from "react";
import TooltipTable from "./TooltipTable";
import TooltipEditorModal from "./TooltipEditorModal";
import { apiFetch } from "../../../../utils/api";
import AdvancedSearch from "./AdvancedSearch";


const TooltipsPage = () => {
  const [tooltips, setTooltips] = useState<any[]>([]);
  const [filteredTooltip, setFilteredTooltip] = useState<any[]>([]);
  const [selectedTooltip, setSelectedTooltip] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [tooltipsData] = await Promise.all([
          apiFetch("/skills-tooltip"),
        ]);

        setTooltips(tooltipsData);
        setFilteredTooltip(tooltipsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleEdit = (tooltip: any) => {
    setSelectedTooltip(tooltip);
  };

  const handleClose = () => {
    setSelectedTooltip(null);
  };

  const handleSave = async (updateTooltip: any) => {
    await apiFetch(`/skills-tooltip/${updateTooltip.skill_id}`, {
      method: "PUT",
      body: JSON.stringify(updateTooltip),
    });

    // refresh list
    const refreshed = await apiFetch("/skills-tooltip");
    setTooltips(refreshed);
    setFilteredTooltip(refreshed);

    handleClose();
  };

  if (loading) {
    return (
      <div style={{ padding: "3rem", fontSize: "2rem", textAlign: "center" }}>
        Loading tooltip data...
      </div>
    );
  }

  return (
    <>
      <AdvancedSearch
        tooltips={tooltips}
        onFilter={setFilteredTooltip}
      />
      <TooltipTable tooltips={filteredTooltip} onEdit={handleEdit} />

      {selectedTooltip && (
        <TooltipEditorModal
          tooltip={selectedTooltip}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default TooltipsPage;
