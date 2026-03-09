import defaultIcon from "../../assets/default.svg";
import type skillListModel from "../../models/skillListModel";
import { useSkillCtx } from "../../store/skills-provider";
import ProgressBar from "../progress-bar/ProgressBar";
import classes from "./SkillCard.module.css";

export default function SkillCard({
  skill,
  skillLevels,
}: {
  skill: skillListModel;
  skillLevels: Record<number, number>;
}) {
  const {onClickSkill} = useSkillCtx();

  console.log(`http://localhost:3000/uploads/logo/${encodeURIComponent(skill.skill_name)}.png`);

  return (
    <div className={classes.skillCard} title={skill.skill_name} onClick={()=>onClickSkill({skill_id: skill.skill_id_trim})}>
      <div className={classes.imgContainer}>
        <img
          src={`http://localhost:3000/uploads/logo/${encodeURIComponent(skill.skill_name)}.png`}
          onError={(e) => {
            e.currentTarget.src = defaultIcon;
          }}
          className="skill-icon"
        />
      </div>
      <ProgressBar
        value={skillLevels[skill.skill_id_trim] ?? 0}
        maxValue={skill.max_level}
        skillId={skill.skill_id_trim}
        skillIdFull={skill.skill_id}
      />
    </div>
  );
}
