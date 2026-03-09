import lunaLogo from "../../assets/luna-logo.png";
import classes from "./LogoSet.module.css";

export default function LogoSet() {
  return (
    <div className={classes.logo}>
      <a
        href="https://lunaonlinefirst.com/"
        target="_blank"
      >
        <img src={lunaLogo} className={classes.logoImg} alt="Luna logo" />
        <p>Luna Skill Calculator</p>
      </a>
    </div>
  );
}
