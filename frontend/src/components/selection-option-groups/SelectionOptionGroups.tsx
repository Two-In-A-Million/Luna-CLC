import type selectionSectionList from "../../models/selectionSectionList";
import SelectionOption from "./SelectionOption";

export default function SelectionOptionGroups({sectionLists} : {sectionLists: selectionSectionList[]}) {
  return (
    <div className="level-div">
      {sectionLists.map((sectionList)=>{
        return <SelectionOption sectionName={sectionList.sectionName} avbOptions={sectionList.avbOptions} key={sectionList.sectionName}/>;
      })}
    </div>
  );
}
