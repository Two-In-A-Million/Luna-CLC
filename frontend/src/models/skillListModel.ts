class skillListModel {
    job_name: string;
    skill_id: number;
    skill_name: string;
    max_level: number;
    skill_id_trim: number;

    constructor(skill_id: number, job_name: string, max_level: number, skill_name: string, skill_id_trim: number){
        this.skill_id = skill_id;
        this.job_name = job_name;
        this.max_level = max_level;
        this.skill_name = skill_name;
        this.skill_id_trim = skill_id_trim;
    }
}

export default skillListModel;