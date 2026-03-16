import defaultIcon from "../../assets/default.svg";
import type skillListModel from "../../models/skillListModel";
import { useSkillCtx } from "../../store/skills-provider";
import ProgressBar from "../progress-bar/ProgressBar";
import classes from "./SkillCard.module.css";
import { API_URL } from "../../config.ts";

export default function SkillCard({
  skill,
  skillLevels,
}: {
  skill: skillListModel;
  skillLevels: Record<number, number>;
}) {
  const {onClickSkill, currSkillNames} = useSkillCtx();

  return (
    <div className={classes.skillCard} title={currSkillNames[skill.skill_id_trim]} onClick={()=>onClickSkill({skill_id: skill.skill_id_trim})}>
      <div className={classes.imgContainer}>
        <img
          src={`${API_URL}uploads/logo/${encodeURIComponent(skill.skill_name)}.png`}
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
