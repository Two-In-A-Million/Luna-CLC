import SkillCard from "./SkillCard";
import classes from './SkillOptions.module.css';

export default function SkillOptions({ skillOptions }: { skillOptions: any[] }) {
    return (
        <div className={classes.skillSelectionDiv}>
            {skillOptions.map((skillOption)=> {return <SkillCard skill={skillOption} key={skillOption.id}/>})}
        </div>
    );
}