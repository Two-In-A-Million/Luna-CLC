import { useSkillCtx } from "../../store/skills-provider";
import classes from "./SkillInfo.module.css";
import SkillMainInfo from "./SkillMainInfo";
import SkillMoreInfo from "./SkillMoreInfo";

export default function SkillInfo() {
  const {currSelectedSkill} = useSkillCtx();

  let skillDetail = 
  <>
    <b>Level Req : {currSelectedSkill?.req_player_level}</b>
    <br />
    SP : {currSelectedSkill?.skill_point}
    <br />
    Gold : {currSelectedSkill?.skill_money}
    <br />
    Target : {currSelectedSkill?.target}
  </>

  return (
    <div className={classes.skillInfo}>
      <h2> Skill Information </h2>
      {
        currSelectedSkill && <div className={classes.skillDesc}>
          <SkillMainInfo skillName={currSelectedSkill.skill_name} skillCD={currSelectedSkill.cooldown} skillMana={currSelectedSkill.mana} equipType={currSelectedSkill.equiptype} skillKind={currSelectedSkill.skill_kind}/>
          <SkillMoreInfo title="Skill Description" text={currSelectedSkill.skill_tooltip}/>
          <SkillMoreInfo title="Skill Detail" text={skillDetail}/>
        </div>
      }
    </div>
  );
}
