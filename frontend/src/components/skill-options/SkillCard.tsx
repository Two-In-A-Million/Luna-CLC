import archerIcon from "../../assets/archery.png";
import type skillListModel from "../../models/skillListModel";
import { useSkillCtx } from "../../store/skills-context";
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

  return (
    <div className={classes.skillCard} title={skill.skill_name} onClick={()=>onClickSkill({skill_id: skill.skill_id_trim})}>
      <div className={classes.imgContainer}>
        <img
          src={`/src/assets/${skill.skill_name}.png`}
          onError={(e) => {
            e.currentTarget.src = archerIcon;
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
