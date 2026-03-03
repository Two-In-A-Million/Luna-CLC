
import cdIcon from "../../assets/cooldown.png";
import manaIcon from "../../assets/mana.png";
import classes from "./SkillMainInfo.module.css";
import archerIcon from "../../assets/archery.png";

export default function SkillMainInfo({
  skillName,
  skillCD,
  skillMana,
  equipType,
}: {
  skillName: string | undefined;
  skillCD: string | undefined;
  skillMana: string | undefined;
  equipType: string | undefined;
}) {
  return (
    <div className={classes.mainInfoCard}>
      <div className={classes.mainInfo}>
        <img
          src={`/src/assets/${skillName}.png`}
          onError={(e) => {
            e.currentTarget.src = archerIcon;
          }}
          alt="skill icon"
          style={{ width: "4rem", height: "4rem" }}
        />
        <span>
          <p className="">{skillName}</p>
          <p className={classes.active}> Active Skill </p>
        </span>
      </div>
      <span className={classes.skillStats}>
        <div>
          <img
            src={cdIcon}
            alt="cd icon"
            style={{ width: "2rem", height: "2rem" }}
          />
          <p className="skill-cd"> CD: {skillCD} </p>
        </div>
        <div>
          <img
            src={manaIcon}
            alt="mana icon"
            style={{ width: "2rem", height: "2rem" }}
          />
          <p className="skill-mana"> Mana: {skillMana} </p>
        </div>
      </span>
      <div>
        <p className={classes.skillEquip}>Equipment type: {equipType} </p>
      </div>
    </div>
  );
}
