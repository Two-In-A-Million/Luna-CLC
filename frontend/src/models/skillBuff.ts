class SkillBuff {
  buffname?: string;
  buffrate?: number;
  buffstatusdata?: string;
  buffdelaytime?: string;
  buffstatus?: string;

  constructor(
    buffname?: string,
    buffrate?: number,
    buffstatusdata?: string,
    buffdelaytime?: string,
    buffstatus?: string
  ) {
    this.buffname = buffname;
    this.buffrate = buffrate;
    this.buffstatusdata = buffstatusdata;
    this.buffdelaytime = buffdelaytime;
    this.buffstatus = buffstatus;
  }
}

export default SkillBuff;
