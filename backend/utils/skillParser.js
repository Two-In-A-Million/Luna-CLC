export default function parseSkillPayload(input) {
  const fieldMap = {
    BUFF: "buffname",
    BUFFNAME: "buffname",
    RATE: "buffrate",
    STATUS: "buffstatus",
    STATUSDATA: "buffstatusdata",
    BUFFDELAYTIME: "buffdelaytime",
    ARMORTYPE: "buffarmortype",
    WEAPONTYPE: "buffweapontype"
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
          case 'buffarmortype':
            value = value.replace(/([A-Z])/g, ' $1').trim();
          case 'buffweapontype':
            value = value.replace(/([A-Z])/g, ' $1').trim();
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
    ).replace(/\$\{BUFFRATE(\d)\}/g, (_, idx) => {
      return result[`buff${idx}`]?.buffrate ?? "";
      }
    ).replace(/\$\{BUFFSTATUS(\d)\}/g, (_, idx) => {
      return result[`buff${idx}`]?.buffstatus ?? "";
      }
    ).replace(/\$\{BUFFDELAYTIME(\d)\}/g, (_, idx) => {
      const value = result[`buff${idx}`]?.buffdelaytime;
      return value ? (parseInt(value)/1000) + "s" : "";
      }
    ).replace(
      /\$\{RANGE\}/g, ()=> {
        const range = (parseInt(result.range)/100) + "m" ?? ""

        return `${range}`;
      }
    ).replace(
      /\$\{UNITDATA\}/g, ()=> {
        const unitData = result.unitdata ?? ""

        return `${unitData}`;
      }
    ).replace(
      /\$\{AREADATA\}/g, ()=> {
        const areaData = (result.area_data)/100 + "m" ?? ""

        return `${areaData}`;
      }
    ).replace(
      /\$\{LEVEL\}/g, ()=> {
        const level = result.level ?? "";

        return `${level}`;
      }
    ).replace(/\$\{EQUIPTYPE\}/g, () => {
      return result.equiptype ?? "";
      }
    ).replace(/\$\{LIFEPLUS\}/g, () => {
      return result.life ?? "";
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
        skill_kind: row.skill_kind,
        unitdata: row.unitdata,
        animationtime: row.animation_time,
        castingtime: row.casting_time,
        cooldown: (row.cooldown/1000).toString() + 's',
        mana: row.mana,
        life: row.life,
        target: row.target,
        areadata: row.area_data,
        req_player_level : row.req_player_level,
        area_data: row.area_data,
        level: row.level
      };

      for (let i = 1; i <= 5; i++) {
        result[`buff${i}`] = {
          buffname: row[`buffname${i}`],
          buffrate: row[`buffrate${i}`],
          buffstatus: row[`buffstatus${i}`],
          buffstatusdata: row[`buffstatusdata${i}`],
          buffdelaytime: row[`buffdelaytime${i}`] ?? null,
          buffweapontype: row[`buffweapontype${i}`] ?? null,
          buffarmortype: row[`buffarmortype${i}`] ?? null,
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
