import { useSkillCtx } from "../../store/skills-context";
import classes from "./SkillInfo.module.css";
import SkillMainInfo from "./SkillMainInfo";
import SkillMoreInfo from "./SkillMoreInfo";

export default function SkillInfo() {
  const {currSelectedSkill} = useSkillCtx();

  return (
    <div className={classes.skillInfo}>
      <h2> Skill Information </h2>
      <div className={classes.skillDesc}>
        <SkillMainInfo skillName={currSelectedSkill?.skill_name}/>
        <SkillMoreInfo title="Skill Description" text={currSelectedSkill?.skill_tooltip}/>
        <SkillMoreInfo title="Skill Efects" text="mual"/>
      </div>
    </div>
  );
}
