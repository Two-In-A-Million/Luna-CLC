import classes from "./SkillInfo.module.css";
import SkillMainInfo from "./SkillMainInfo";
import SkillMoreInfo from "./SkillMoreInfo";

export default function SkillInfo() {
  return (
    <div className={classes.skillInfo}>
      <h2> Skill Information </h2>
      <div className="skill-description">
        <SkillMainInfo/>
        <SkillMoreInfo title="Skill Description" text="lorem ipsum dolor sitt ametetetatasenaifniuwjdfio  aoidjo wiajda JDIUAWJEFIO UWEFIOUWHFIUHQI wJHAIDAwid IU D uiiwj iodwj"/>
        <SkillMoreInfo title="Skill Efects" text="mual"/>
      </div>
    </div>
  );
}
