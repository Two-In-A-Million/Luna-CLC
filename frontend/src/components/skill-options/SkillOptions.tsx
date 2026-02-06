import classes from "./SkillOptions.module.css";
import SkillCard from "./SkillCard";

export default function SkillOptions({ skillOptions }: { skillOptions: any[] }) {

    return (
        <div className={classes.skillMainDiv}>
            <div className={classes.skillSelectionTitle}>Skills</div>
            <div className={classes.skillSelectionDiv}>
                {skillOptions.map((skillOption)=> {return <SkillCard skill={skillOption} key={skillOption.id}/>})}
            </div>
        </div>
    );
}