import styles from "./Tab.module.css";
import SearchableSelect from "../../../../searchable-select/SearchableSelect";


interface TabProps {
  data: any;
  tooltipList: any[];
  onChange: (field: string, value: any) => void;
}

const Tooltip: React.FC<TabProps> = ({ data, tooltipList, onChange }) => {
    console.log(data.skill_tooltip);
    return (
        <div className={styles.container}>
        <h3>Tooltip Configuration</h3>
        <SearchableSelect
            data={tooltipList}
            valueKey="skill_id"
            labelKey="skill_tooltip"
            value={data.skill_tooltip}
            onChange={(val) => onChange("skill_tooltip", val)}
            placeholder="Search tooltip..."
        />
        </div>
    );
};

export default Tooltip;
