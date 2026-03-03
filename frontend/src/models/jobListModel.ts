class jobListModel {
    job_id: number;
    job_name: string;
    level: number;
    race: string;

    constructor(job_id: number, job_name: string, level: number, race: string){
        this.job_id = job_id;
        this.job_name = job_name;
        this.level = level;
        this.race = race;
    }
}

export default jobListModel;