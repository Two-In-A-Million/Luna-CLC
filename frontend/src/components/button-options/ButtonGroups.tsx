import buttonDetail from "../../models/buttonDetail";
import classes from "./ButtonGroups.module.css";

export default function ButtonGroups({
  buttonDetails,
}: {
  buttonDetails: buttonDetail[];
}) {
  return (
    <div className={classes.div}>
      {buttonDetails.map((buttonDetail) => {
        return (() => {
          if (buttonDetail.imgButton) {
            return (
              <button
                // onClick={ }
                title={buttonDetail.title}
                key={buttonDetail.label}
              >
                <img src={buttonDetail.img ?? ""} className="class-icon" />
              </button>
            );
          } 
          else if (!buttonDetail.imgButton) {
            return (
              <button
                // onClick={ }
                title={buttonDetail.title}
                key={buttonDetail.label}
              >
                {buttonDetail.label}
              </button>
            );
          }
        })();
      })}
    </div>
  );
}
