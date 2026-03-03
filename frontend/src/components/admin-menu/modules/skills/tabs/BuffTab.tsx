import styles from "./Tab.module.css";
import SearchableSelect from "../../../../searchable-select/SearchableSelect";

interface Props {
  data: any;
  buffList: any[];
  onChange: (field: string, value: any) => void;
}

const BuffTab: React.FC<Props> = ({ data, buffList, onChange }) => {
  const renderBuffRow = (index: number) => {
    console.log(buffList);

    return (
      <div key={index} className={styles.buffRow}>
        <SearchableSelect
            data={buffList}
            valueKey="skill_idx"
            labelKey="skill_name"
            value={data[`buff_id_${index}`] || ""}
            onChange={(val) => onChange(`buff_id_${index}`, val)}
            placeholder={`Search buff ${index}`}
        />
        <input
          type="number"
          placeholder="Rate"
          value={data[`rate_buff_${index}`] || ""}
          onChange={(e) =>
            onChange(`rate_buff_${index}`, Number(e.target.value))
          }
        />
        </div>
    );
  };

  return (
    <div className={styles.container}>
      <h3>Buff Configuration</h3>
      {[1, 2, 3, 4, 5].map(renderBuffRow)}
    </div>
  );
};

export default BuffTab;
