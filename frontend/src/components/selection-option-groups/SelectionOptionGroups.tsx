import { useRef } from "react";
import type jobListModel from "../../models/jobListModel";
import type selectionSectionList from "../../models/selectionSectionList";
import SelectionOption from "./SelectionOption";
import classes from "./SelectionOptionGroups.module.css";

export default function SelectionOptionGroups({
  sectionLists,
  jobLists,
  onSelectJob
}: {
  sectionLists: selectionSectionList[];
  jobLists: jobListModel[] | null;
  onSelectJob: ({levelCap, value} : {levelCap: number; value:number}) => void;
}) {
  return (
    <div className={classes.levelDiv}>
      {sectionLists.map((sectionList) => {
        function filterLevel(job: jobListModel) {
          return job.level === sectionList.levelCap;
        }

        let jobIncluded = jobLists ? jobLists.filter(filterLevel) : null;

        jobIncluded?.push({
          job_id: 0,
          job_name: "None",
          level: sectionList.levelCap,
          race: "Any",
        });

        return (
          <SelectionOption
            sectionName={sectionList.sectionName}
            level={sectionList.levelCap}
            avbOptions={jobIncluded}
            key={sectionList.sectionName}
            selected={sectionList.selected}
            onSelectJob={onSelectJob}
          />
        );
      })}
    </div>
  );
}
