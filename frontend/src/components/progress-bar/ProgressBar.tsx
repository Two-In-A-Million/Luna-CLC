import classes from "./ProgressBar.module.css";
export default function ProgressBar({
  value,
  maxValue,
}: {
  value: number;
  maxValue: number;
}) {
  const percentage = (value / maxValue) * 100;

  return (
    <>
      <p className={classes.p}>
        {value}/{maxValue}
      </p>
      <div className={classes.barBackground}>
        <div style={{ width: `${percentage}%` }} />
      </div>
    </>
  );
}
