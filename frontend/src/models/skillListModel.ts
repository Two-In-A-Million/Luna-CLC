class skillListModel {
    skill_id: number;
    skill_name: string;
    job_name: string;
    sp_qty: number;
    gold_qty: number;
    max_level: number;

    constructor(skill_id: number, job_name: string, max_level: number, skill_name: string, sp_qty:number, gold_qty:number){
        this.skill_id = skill_id;
        this.job_name = job_name;
        this.max_level = max_level;
        this.skill_name = skill_name;
        this.sp_qty = sp_qty;
        this.gold_qty = gold_qty;
    }
}

export default skillListModel;

// example data: 
// Crash Blow => ID : 1100101 (on DB)
// Then:
// skill_id = 11001
// max_level = 05 or 5 (any)
// if class upgraded, send only 1 id to frontend with max_level value updated