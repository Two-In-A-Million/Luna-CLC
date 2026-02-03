import type buttonDetail from "../../models/buttonDetail";
import ButtonGroups from "./ButtonGroups";
import classes from "./ButtonOptions.module.css";

export default function ButtonOptions({
  sectionName,
  options,
  selected,
  onClickEvent,
}: {
  sectionName: string;
  options: buttonDetail[];
  selected: string;
  onClickEvent: (race: string) => void;
}) {
  return (
    <div className={classes.div}>
      <p className={`${sectionName}-p`}> Select {sectionName} </p>

      <div className={classes.divButton}>
        {options.map((option) => {
          return (
            <ButtonGroups
              buttonDetails={option}
              selected={selected}
              onClickEvent={() => onClickEvent(option.label)}
            />
          );
        })}
      </div>
    </div>
  );
}
