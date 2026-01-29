import type buttonDetail from "../../models/buttonDetail";
import ButtonGroups from "./ButtonGroups";
import classes from './ButtonOptions.module.css';

export default function ButtonOptions({sectionName, options} : {sectionName: string, options: buttonDetail[]}) {
    return (
        <div className={classes.div}>
            <p className={`${sectionName}-p`}> Select {sectionName} </p>
            <ButtonGroups buttonDetails={options} />
        </div>)
}