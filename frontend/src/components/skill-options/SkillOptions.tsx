import SkillCard from "./SkillCard";

export default function SkillOptions({ skillOptions }: { skillOptions: any[] }) {
    return (
        <div className="skill-selection-div">
            {skillOptions.map((skillOption)=> {return <SkillCard skill={skillOption} key={skillOption.id}/>})}
        </div>
    );
}