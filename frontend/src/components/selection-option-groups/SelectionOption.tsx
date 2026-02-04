import type jobListModel from "../../models/jobListModel";
import classes from "./SelectionOption.module.css";

export default function SelectionOption({
  sectionName,
  avbOptions,
  selected,
  level,
  onSelectJob
}: {
  sectionName: string;
  avbOptions: jobListModel[] | null;
  selected: number;
  level: number;
  onSelectJob: ({levelCap, value} : {levelCap: number; value:number}) => void;
}) {
  return (
    <>
      <p className={classes.p}> {sectionName} </p>
      <select className={classes.selectOption} onChange={ (val)=> onSelectJob({levelCap:level, value: Number(val.target.value)}) }>
        {avbOptions?.map((option) => (
          <option
            key={option.job_id}
            value={option.job_id}
            selected={option.job_id === selected}
          >
            {option.job_name}
          </option>
        ))}
      </select>
    </>
  );
}
