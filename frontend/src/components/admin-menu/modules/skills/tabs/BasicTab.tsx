import styles from "./Tab.module.css";

interface TabProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

const BasicTab: React.FC<TabProps> = ({ data, onChange }) => {
  return (
    <div >
      <h3 className={styles.subHeader}>Basic Configuration</h3>
      <label>Name</label>
      <input
        value={data.skill_name}
        onChange={(e) => onChange("skill_name", e.target.value)}
      />
      <label>Damage</label>
      <input
        type="number"
        value={data.unit_data_type}
        onChange={(e) => onChange("unit_data_type", Number(e.target.value))}
      />
      
      <label>Area</label>
      <input
        type="number"
        value={data.area_target}
        onChange={(e) => onChange("area_target", Number(e.target.value))}
      />

      <label>Animation Time</label>
      <input
        type="number"
        value={data.animation_time}
        onChange={(e) => onChange("animation_time", Number(e.target.value))}
      />

      <label>Cooldown</label>
      <input
        type="number"
        value={data.cool_time}
        onChange={(e) => onChange("cool_time", Number(e.target.value))}
      />

      <label>SP</label>
      <input
        type="number"
        value={data.train_point}
        onChange={(e) => onChange("train_point", Number(e.target.value))}
      />

      <label>Money</label>
      <input
        type="number"
        value={data.money}
        onChange={(e) => onChange("money", Number(e.target.value))}
      />

     <label>Mana</label>
      <input
        type="number"
        value={data.mana}
        onChange={(e) => onChange("mana", Number(e.target.value))}
      />
      <label>Life</label>
      <input
        type="number"
        value={data.life}
        onChange={(e) => onChange("life", Number(e.target.value))}
      />
    </div>
  );
};

export default BasicTab;
