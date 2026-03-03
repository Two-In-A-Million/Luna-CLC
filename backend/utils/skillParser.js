export default function parseSkillPayload(input) {
  const fieldMap = {
    BUFF: "buffname",
    BUFFNAME: "buffname",
    RATE: "buffrate",
    STATUS: "buffstatus",
    STATUSDATA: "buffstatusdata",
    BUFFDELAYTIME: "buffdelaytime"
  };

  function applyBuffPlaceholder(desc, result) {
    return desc.replace(
      /\$\{BUFF(\d)\}->\$\{([A-Z]+)\}/g,
      (_,idx, fieldKey) => {
        const buff = result[`buff${idx}`];
        if (!buff) return "";

        const field = fieldMap[fieldKey];
        if (!field) return "";

        let value = buff[field] ?? "";
        switch (field) {
          case 'buffstatus':
            value = value.replace(/([A-Z])/g, ' $1').trim();
            break;
          case 'buffdelaytime':
            value = (parseInt(value) / 1000).toString() + 's';
            break;
          default:
            value;
            break;
        }
        return `${value}`;
      },
    ).replace(
      /\$\{ANIMATIONTIME\}/g, ()=> {
        const animationTime = (parseInt(result.animationtime) / 1000).toString() + 's' ?? ""

        return `${animationTime}`;
      }
    ).replace(
      /\$\{RANGE\}/g, ()=> {
        const range = result.range ?? ""

        return `${range}`;
      }
    ).replace(
      /\$\{UNITDATA\}/g, ()=> {
        const unitData = result.unitdata ?? ""

        return `${unitData}`;
      }
    ).replace(
      /\$\{AREADATA\}/g, ()=> {
        const areaData = result.areadata ?? ""

        return `${areaData}`;
      }
    );
  }

  return {
    query: input.map((row) => {
      const result = {
        skill_name: row.skill_name,
        skill_point: row.skill_point,
        skill_money: row.skill_money,
        range: row.range,
        equiptype: row.equiptype,
        unitdata: row.unitdata,
        animationtime: row.animation_time,
        castingtime: row.casting_time,
        cooldown: (row.cooldown/1000).toString() + 's',
        mana: row.mana,
        target: row.target,
        areadata: row.area_data,
      };

      for (let i = 1; i <= 5; i++) {
        result[`buff${i}`] = {
          buffname: row[`buffname${i}`],
          buffrate: row[`buffrate${i}`],
          buffstatus: row[`buffstatus${i}`],
          buffstatusdata: row[`buffstatusdata${i}`],
          buffdelaytime: row[`buffdelaytime${i}`] ?? null,
        };
      }

      result["skill_tooltip"] = applyBuffPlaceholder(
        row.skill_tooltip,
        result,
      );

      return result;
    }),
  };
}
