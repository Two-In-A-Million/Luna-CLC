import type SkillBuff  from "./skillBuff";

class skillDetailModel {
  skill_name: string;
  skill_tooltip: string;
  skill_point: number;
  skill_money: number;
  range: number;
  equiptype: string;
  unitdata: string;
  animation_time: number;
  casting_time: number;
  cooldown: string;
  mana: string;
  target: string;
  buff1: SkillBuff[];
  buff2: SkillBuff[];
  buff3: SkillBuff[];
  buff4: SkillBuff[];
  buff5: SkillBuff[];

  constructor(
    skill_name: string,
    skill_tooltip: string,
    skill_point: number,
    skill_money: number,
    range: number,
    equiptype: string,
    unitdata: string,
    animation_time: number,
    casting_time: number,
    cooldown: string,
    mana: string,
    target: string,
    buff1: SkillBuff[],
    buff2: SkillBuff[],
    buff3: SkillBuff[],
    buff4: SkillBuff[],
    buff5: SkillBuff[]
  ) {
    this.skill_name = skill_name;
    this.skill_tooltip = skill_tooltip;
    this.skill_point = skill_point;
    this.skill_money = skill_money;
    this.range = range;
    this.equiptype = equiptype;
    this.unitdata = unitdata;
    this.animation_time = animation_time;
    this.casting_time = casting_time;
    this.cooldown = cooldown;
    this.mana = mana;
    this.target = target;
    this.buff1 = buff1;
    this.buff2 = buff2;
    this.buff3 = buff3;
    this.buff4 = buff4;
    this.buff5 = buff5;
  }
}

export default skillDetailModel;
