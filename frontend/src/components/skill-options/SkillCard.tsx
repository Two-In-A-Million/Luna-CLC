import archerIcon from "../../assets/archery.png";
import ProgressBar from "../progress-bar/ProgressBar";
import classes from "./SkillCard.module.css";

export default function SkillCard({ skill }: { skill: any }) {
  let pressed = false;

  return (
    <div className={classes.skillCard} title={skill.label}>
      <div className={classes.imgContainer} title={skill.label}>
        <img src={archerIcon} className="skill-icon" />
      </div>
      <ProgressBar value={1} maxValue={5} />
      <span>
        {pressed ? (
          <>
            <button> Learn </button>
          </>
        ) : (
          <>
            <button><i className="fa fa-minus" aria-hidden="true"></i></button>
            <button><i className="fa fa-plus" aria-hidden="true"></i></button>
          </>
        )}
      </span>
    </div>
  );
}
