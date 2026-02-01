import classes from "./SelectionOption.module.css";

export default function SelectionOption({sectionName, avbOptions} : {sectionName: string, avbOptions: string[]}) {
  return (
    <>
      <p className={classes.p}> {sectionName} </p>
        <select className={classes.selectOption}>
          {avbOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
    </>
  );
}