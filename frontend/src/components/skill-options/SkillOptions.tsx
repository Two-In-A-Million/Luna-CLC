import classes from "./SkillOptions.module.css";
import SkillCard from "./SkillCard";
import type skillListModel from "../../models/skillListModel";

export default function SkillOptions({ skillOptions, skillLevels }: { skillOptions: skillListModel[] | undefined, skillLevels: Record<number, number> }) {

    const skillFiltered = Object.values(
        (skillOptions ?? []).reduce((acc, skill) => {
            const existing = acc[skill.skill_id_trim];

            if (!existing || skill.max_level > existing.max_level) {
                acc[skill.skill_id_trim] = skill;
            }

            return acc;
        }, {} as Record<number, skillListModel>)
    );

    return (
        <div className={classes.skillMainDiv}>
            <div className={classes.skillSelectionTitle}>Skills</div>
            <div className={classes.skillSelectionDiv}>
                {skillFiltered.map((skillOption)=> {return <SkillCard skill={skillOption} key={skillOption.skill_id_trim} skillLevels={skillLevels}/>})}
            </div>
        </div>
    );
}