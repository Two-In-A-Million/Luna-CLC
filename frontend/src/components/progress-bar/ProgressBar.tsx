import { useSkillCtx } from "../../store/skills-context";
import classes from "./ProgressBar.module.css";
export default function ProgressBar({
  value,
  maxValue,
  skillId,
  skillIdFull
}: {
  value: number;
  maxValue: number;
  skillId: number;
  skillIdFull: number;
}) {
  const percentage = (value / maxValue) * 100;

  const {updateSkillLevel, updateSpDetail} = useSkillCtx();

  return (
    <>
      <div className={classes.barBackground}>
        <div style={{ width: `${percentage}%` }} />
      </div>

      <span className={classes.span}>
        <button onClick={ async (e)=>{
            e.stopPropagation();
            
            const changed = updateSkillLevel({skill_id: skillId, command: 'minus', max_level: maxValue});
            
            if (changed === 'minus') {
              await updateSpDetail(skillId, changed);
            }
          }}>
          <i className="fa fa-minus" aria-hidden="true"></i>
        </button>
        <p className={classes.p}>
          {value}/{maxValue}
        </p>
        <button onClick={ async (e)=>{
            e.stopPropagation();
            const changed = updateSkillLevel({skill_id: skillId, command: 'add', max_level: maxValue});
            
            if (changed === 'plus') {
              await updateSpDetail(skillId, changed);
            }
          }}>
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
      </span>
    </>
  );
}
