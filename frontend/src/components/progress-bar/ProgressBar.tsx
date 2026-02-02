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
      <div className={classes.barBackground}>
        <div style={{ width: `${percentage}%` }} />
      </div>

      <span className={classes.span}>
        <button>
          <i className="fa fa-minus" aria-hidden="true"></i>
        </button>
        <p className={classes.p}>
          {value}/{maxValue}
        </p>
        <button>
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
      </span>
    </>
  );
}
