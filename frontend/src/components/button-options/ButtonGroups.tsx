import buttonDetail from "../../models/buttonDetail";
import classes from "./ButtonGroups.module.css";

export default function ButtonGroups({
  buttonDetails,
  selected,
  onClickEvent,
}: {
  buttonDetails: buttonDetail;
  selected: string;
  onClickEvent: () => void;
}) {
  return (
    <>
      {buttonDetails.imgButton ? (
        <button
          onClick={onClickEvent}
          title={buttonDetails.title}
          key={buttonDetails.label}
          className={selected === buttonDetails.label ? classes.active : ""}
        >
          <img src={buttonDetails.img ?? ""} className="class-icon" />
        </button>
      ) : (
        <button
          onClick={onClickEvent}
          title={buttonDetails.title}
          key={buttonDetails.label}
          className={selected === buttonDetails.label ? classes.active : ""}
        >
          {buttonDetails.label}
        </button>
      )}
    </>
  );
}
