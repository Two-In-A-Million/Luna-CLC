import classes from "./SelectionOption.module.css";

export default function SelectionOption({sectionName, avbOptions} : {sectionName: string, avbOptions: string[]}) {
  return (
    <>
      <p className={classes.p}> {sectionName} </p>
      <div className={classes.selectOption}>
        <select>
          {avbOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    </>
  );
}