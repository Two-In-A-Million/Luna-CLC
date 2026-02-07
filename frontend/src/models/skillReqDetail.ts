class skillReqDetail {
    total_sp: number;
    total_gold: number;
    sp_remain: number;

    constructor(total_sp: number, total_gold: number, sp_remain: number){
        this.total_sp = total_sp;
        this.total_gold = total_gold;
        this.sp_remain = sp_remain;
    }
}

export default skillReqDetail;