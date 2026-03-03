import classes from "./SkillOptions.module.css";
import SkillCard from "./SkillCard";
import type skillListModel from "../../models/skillListModel";

export default function SkillOptions({ skillOptions, skillLevels }: { skillOptions: skillListModel[] | undefined, skillLevels: Record<number, number> }) {

    const skillFiltered = Array.from(
        new Map<number, skillListModel>(skillOptions?.map(skill => [skill.skill_id_trim, skill] as [number, skillListModel]).reverse()).values()
    ).reverse();

    return (
        <div className={classes.skillMainDiv}>
            <div className={classes.skillSelectionTitle}>Skills</div>
            <div className={classes.skillSelectionDiv}>
                {skillFiltered.map((skillOption)=> {return <SkillCard skill={skillOption} key={skillOption.skill_id_trim} skillLevels={skillLevels}/>})}
            </div>
        </div>
    );
}