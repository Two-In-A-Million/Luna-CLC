import classes from './NowLoading.module.css';

export default function NowLoading() {
  const text = "NOW LOADING";

  return (
    <div className={classes.loadingWrapper}>
      <div className={classes.panel}>
        <div className={classes.header}>SYSTEM</div>
        <div className={classes.retroLoadingDiv}>
          {text.split("").map((char, index) => (
            <span
              key={index}
              className={classes.loadingLetter}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
