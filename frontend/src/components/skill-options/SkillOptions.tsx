import classes from "./SkillOptions.module.css";
import SkillCard from "./SkillCard";

export default function SkillOptions({ skillOptions }: { skillOptions: any[] }) {

//     useEffect(() => {
//     // get data
//     async function getJobListData() {
//       let charDetail = {
//         race: currRace,
//         class: currCharClass,
//         jobName20: 'Fighter',
//         jobName40: 'None'
//       }

//       let getJobList = await fetch("http://localhost:3000/get-job-list", {
//         method: "POST",
//         body: JSON.stringify({charDetail : charDetail}),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       let jobList = await getJobList.json();
//       setJobLists(jobList.query);
//     }

//     getJobListData();

//   }, [currRace, currCharClass]);

    return (
        <div className={classes.skillMainDiv}>
            <div className={classes.skillSelectionTitle}>Skills</div>
            <div className={classes.skillSelectionDiv}>
                {skillOptions.map((skillOption)=> {return <SkillCard skill={skillOption} key={skillOption.id}/>})}
            </div>
        </div>
    );
}