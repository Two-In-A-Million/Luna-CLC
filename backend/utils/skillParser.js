export default function parseSkillPayload(input) {
  return {
    query: input.map(row => {
      const result = {
        skill_name: row.skill_name,
        skill_tooltip: row.skill_tooltip,
        skill_point: row.skill_point,
        skill_money: row.skill_money,
        range: row.range,
        equiptype: row.equiptype,
        unitdata: row.unitdata
      };

      for (let i = 1; i <= 5; i++) {
        result[`buff${i}`] = {
          buffname: row[`buffname${i}`],
          buffrate: row[`buffrate${i}`],
          buffstatus: row[`buffstatus${i}`],
          buffstatusdata: row[`buffstatusdata${i}`],
          buffdelaytime: row[`buffdelaytime${i}`] ?? null
        };
      }

      return result;
    })
  };
}
