import type selectionSectionList from "../../models/selectionSectionList";
import SelectionOption from "./SelectionOption";
import classes from "./SelectionOptionGroups.module.css";

export default function SelectionOptionGroups({sectionLists} : {sectionLists: selectionSectionList[]}) {
  return (
    <div className={classes.levelDiv}>
      {sectionLists.map((sectionList)=>{
        return <SelectionOption sectionName={sectionList.sectionName} avbOptions={sectionList.avbOptions} key={sectionList.sectionName}/>;
      })}
    </div>
  );
}
