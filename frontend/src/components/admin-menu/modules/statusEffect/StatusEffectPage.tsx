import { useState, useEffect } from "react";
import StatusEffectTable from "./StatusEffectTable";
import StatusEffectEditorModal from "./StatusEffectEditorModal";
import { apiFetch } from "../../../../utils/api";
import AdvancedSearch from "./AdvancedSearch";


const StatusEffectPage = () => {
  const [statusEffects, setStatusEffect] = useState<any[]>([]);
  const [filteredStatusEffect, setFilteredStatusEffect] = useState<any[]>([]);
  const [selectedStatusEffect, setSelectedStatusEffect] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [statusEffect] = await Promise.all([
          apiFetch("/status-effect"),
        ]);

        setStatusEffect(statusEffect);
        setFilteredStatusEffect(statusEffect);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleEdit = (tooltip: any) => {
    setSelectedStatusEffect(tooltip);
  };

  const handleClose = () => {
    setSelectedStatusEffect(null);
  };

  const handleSave = async (updateStatusEffect: any) => {
    await apiFetch(`/status-effect/${updateStatusEffect.status_id}`, {
      method: "PUT",
      body: JSON.stringify(updateStatusEffect),
    });

    // refresh list
    const refreshed = await apiFetch("/status-effect");
    setStatusEffect(refreshed);
    setFilteredStatusEffect(refreshed);

    handleClose();
  };

  if (loading) {
    return (
      <div style={{ padding: "3rem", fontSize: "2rem", textAlign: "center" }}>
        Loading status effect data...
      </div>
    );
  }

  return (
    <>
      <AdvancedSearch
        statusEffects={statusEffects}
        onFilter={setFilteredStatusEffect}
      />
      <StatusEffectTable statusEffects={filteredStatusEffect} onEdit={handleEdit} />

      {selectedStatusEffect && (
        <StatusEffectEditorModal
          statusEffect={selectedStatusEffect}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default StatusEffectPage;
