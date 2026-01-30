import archerIcon from "../../assets/archery.png";
export default function SkillCard({ skill }: { skill: any }) {
  let pressed = false;

  return (
    <div className="skill-card" title={skill.label}>
      <div className="skill-card-inner-div" title={skill.label}>
        <img src={archerIcon} className="skill-icon" />
        <div className="skill-qty-div">
          {pressed ? (
            <>
                <button className="skill-button"> Learn </button>
            </>
          ) : (
            <>
              <button className="skill-button"> - </button>
              <span className="skill-level"> 5 </span>
              <button className="skill-button"> + </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
