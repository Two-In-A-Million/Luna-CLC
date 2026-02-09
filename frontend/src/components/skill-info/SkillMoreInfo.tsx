import classes from "./SkillMoreInfo.module.css";

export default function SkillMoreInfo({title, text} : {title: string, text: string|undefined}) {
  return (
    <>
      <h4 className={classes.h4}>{title}:</h4>
      <p className={classes.p}>
          {text}
      </p>
    </>
  );
}
