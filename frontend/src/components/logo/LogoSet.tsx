import lunaLogo from "../../assets/luna-logo.png";
import classes from "./LogoSet.module.css";

export default function LogoSet() {
  return (
    <div className={classes.logo}>
      <a
        href="https://www.google.com/search?client=opera-gx&q=luna&sourceid=opera&ie=UTF-8&oe=UTF-8"
        target="_blank"
      >
        <img src={lunaLogo} className={classes.logoImg} alt="Luna logo" />
        <p>Luna Skill Calculator</p>
      </a>
    </div>
  );
}
