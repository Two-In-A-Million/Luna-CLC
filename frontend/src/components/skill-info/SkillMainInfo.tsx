
import classes from "./SkillMainInfo.module.css";
import defaultIcon from "../../assets/default.svg";
import { API_URL } from "../../config.ts";


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
          src={`${API_URL}uploads/logo/${encodeURIComponent(skillName ?? "")}.png`}
          onError={(e) => {
            e.currentTarget.src = defaultIcon;
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
            src={`${API_URL}uploads/logo/cooldown.png`}
            alt="cd icon"
            style={{ width: "2rem", height: "2rem" }}
          />
          <p className="skill-cd"> CD: {skillCD} </p>
        </div>
        <div>
          <img
            src={`${API_URL}uploads/logo/mana.png`}
            alt="mana icon"
            style={{ width: "2rem", height: "2rem" }}
          />
          <p className="skill-mana"> Mana: {skillMana} </p>
        </div>
      </span>
      {equipType ? (
        <div>
          <p className={classes.skillEquip}>Equipment type: {equipType}</p>
        </div>
      ) : null}
    </div>
  );
}
