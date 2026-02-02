import mageIcon from "../../assets/mage.png";
import warriorIcon from "../../assets/swords.png";
import classes from './SkillMainInfo.module.css'

export default function SkillMainInfo() {
  return (
    <div className={classes.mainInfoCard}>
      <div className={classes.mainInfo}>
        <img
          src={mageIcon}
          alt="skill icon"
          style={{ width: "4rem", height: "4rem" }}
        />
        <span>
          <p className=""> Dildo Strike </p>
          <p className={classes.active}> Active Skill </p>
        </span>
      </div>
      <span className={classes.skillStats}>
        <div>
          <img
            src={warriorIcon}
            alt="cd icon"
            style={{ width: "1rem", height: "1rem" }}
          />
          <p className="skill-cd"> 10.0s</p>
        </div>
        <div>
          <img
            src={warriorIcon}
            alt="mana icon"
            style={{ width: "1rem", height: "1rem" }}
          />
          <p className="skill-mana"> 20 MP </p>
        </div>
        <div>
          <img
            src={warriorIcon}
            alt="sp icon"
            style={{ width: "1rem", height: "1rem" }}
          />
          <p className="skill-sp"> 1 </p>
        </div>
      </span>
    </div>
  );
}
