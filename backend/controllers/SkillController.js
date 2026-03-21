import pool from "../db.js";
import parseSkillPayload from "../utils/skillParser.js";

export async function getAllSkill(req, res) {
  const result = await pool.query("SELECT * FROM job_skill");
  res.status(200).json({ text: "hello", query: result.rows });
}

export async function getAllJobList(req, res) {
    const result = await pool.query(`
        SELECT
            jl.race,
            jl.job_name,
            jl.level,
            jl.job_id
        FROM 
            job_list jl
        WHERE 
            jl.race != 'Devil'
            AND level != 145
    `);

    res.status(200).json({ text: "job-list", query: result.rows });
}

export async function getJobList(req, res) {
    const { charDetail } = req.body;

    const result = await pool.query(`
    SELECT
        jl.race,
        jl.job_name,
        jl.level,
        jl.job_id
    FROM 
        job_list jl
    WHERE 
        jl.race != 'Devil'
        AND jl.level != 145
        AND jl.level != 0
        AND jl.race = $1
        AND LEFT(jl.job_id::text, 2) = (
            SELECT LEFT(jl.job_id::text, 2)
                FROM job_list jl
                WHERE jl.race = $1
                AND jl.job_name = $2
        )
    `, [charDetail.race, charDetail.class]);

    res.status(200).json({ text: "job-list", query: result.rows });
}

export async function getSkillList(req, res) {
    const { charDetail } = req.body;

    const baseJobId = await pool.query("\
      SELECT\
        jl.job_id\
      FROM\
        job_list jl\
      WHERE\
        jl.race != 'Devil'\
        AND jl.level != 145 \
        AND jl.level = 0\
        AND jl.race = '"+charDetail.race+"'\
        AND jl.job_name = '"+charDetail.class+"'\
    ");

    const jobIds = Object.entries(charDetail)
    .filter(([key, value]) => key.startsWith("jobId") && value !== "None")
    .map(([, value]) => value);

    jobIds.push(baseJobId.rows[0]?.job_id);

    const result = await pool.query(`
    SELECT
        jl.job_name,
        js.skill_id,
        replace(s.skill_name, '^s', ' ') AS skill_name,
        substr(js.skill_id::text, length(js.skill_id::text) - 1)::int as max_level,
        substr(js.skill_id::text, 0, length(js.skill_id::text) - 1)::int as skill_id_trim
    FROM 
        job_list jl
        JOIN job_skill js ON jl.job_id = js.job_id
        JOIN skills s ON s.skill_idx = js.skill_id
    WHERE 
        jl.job_id = ANY($1)
        AND jl.race = $2
    ORDER BY 
        jl.race, jl.level, s.skill_idx
    `, [jobIds, charDetail.race]);

    res.status(200).json({ query: result.rows });
}

export async function getSkillDetail(req, res) {
  const { skill } = req.body;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    await client.query('SET LOCAL jit = off');

    const result = await client.query(`
      SELECT
        replace(s.skill_name, '^s', ' ') AS skill_name,
        st.skill_tooltip,
        s.train_point as skill_point,
        s.train_money as skill_money,
        s.range as range,
        et.equip_name as equiptype,
        s.unit_data_type as unitdata,
        s.animation_time,
        s.casting_time,
        s.area_data,
        s.skill_effect,
        s.mana,
        s.life,
        CASE 
            WHEN s.kind = 2 THEN 'Passive'
            ELSE 'Active'
        END AS skill_kind,
        s.target,
        s.cool_time as cooldown,
        s.req_player_level,
        s.cancel as range,
        s.skill_level as level,
        s.area_target as area_data,
        replace(sb1.skill_name, '^s', ' ') AS buffname1,
        s.rate_buff_1 as buffrate1,
        sb1.status_data_value as buffstatusdata1, 
        sb1.delay_time as buffdelaytime1,
        at1.equip_name as buffarmortype1,
        wt1.equip_name as buffweapontype1,
        se1.status_name as buffstatus1,
        replace(sb2.skill_name, '^s', ' ') AS buffname2,
        s.rate_buff_2 as buffrate2,
        sb2.status_data_value as buffstatusdata2,
        sb2.delay_time as buffdelaytime2,
        at2.equip_name as buffarmortype2,
        wt2.equip_name as buffweapontype2,
        se2.status_name as buffstatus2,
        replace(sb3.skill_name, '^s', ' ') AS buffname3,
        s.rate_buff_3 as buffrate3,
        sb3.status_data_value as buffstatusdata3,
        sb3.delay_time as buffdelaytime3,
        at3.equip_name as buffarmortype3,
        wt3.equip_name as buffweapontype3,
        se3.status_name as buffstatus3,
        replace(sb4.skill_name, '^s', ' ') AS buffname4,
        s.rate_buff_4 as buffrate4,
        sb4.status_data_value as buffstatusdata4,
        sb4.delay_time as buffdelaytime4, 
        at4.equip_name as buffarmortype4,
        wt4.equip_name as buffweapontype4,
        se4.status_name as buffstatus4,
        replace(sb5.skill_name, '^s', ' ') AS buffname5,
        s.rate_buff_5 as buffrate5,
        sb5.status_data_value as buffstatusdata5,
        sb5.delay_time as buffdelaytime5,
        at5.equip_name as buffarmortype5,
        wt5.equip_name as buffweapontype5,
        se5.status_name as buffstatus5
      FROM 
        skills s
        JOIN skill_tooltip st ON st.skill_idx = s.skill_tooltip
        LEFT JOIN LATERAL (SELECT * FROM skills_buff WHERE skill_idx = s.buff_id_1) sb1 ON true
        LEFT JOIN LATERAL (SELECT * FROM skills_buff WHERE skill_idx = s.buff_id_2) sb2 ON true
        LEFT JOIN LATERAL (SELECT * FROM skills_buff WHERE skill_idx = s.buff_id_3) sb3 ON true
        LEFT JOIN LATERAL (SELECT * FROM skills_buff WHERE skill_idx = s.buff_id_4) sb4 ON true
        LEFT JOIN LATERAL (SELECT * FROM skills_buff WHERE skill_idx = s.buff_id_5) sb5 ON true
        LEFT JOIN status_effect se1 ON sb1.status = se1.status_id
        LEFT JOIN status_effect se2 ON sb2.status = se2.status_id
        LEFT JOIN status_effect se3 ON sb3.status = se3.status_id
        LEFT JOIN status_effect se4 ON sb4.status = se4.status_id
        LEFT JOIN status_effect se5 ON sb5.status = se5.status_id
        LEFT JOIN equipment_type et ON et.equip_id = s.equip
        LEFT JOIN weapon_type wt1 ON wt1.equip_id = sb1.weapon
        LEFT JOIN armor_type at1 ON at1.equip_id = sb1.armor
        LEFT JOIN weapon_type wt2 ON wt2.equip_id = sb2.weapon
        LEFT JOIN armor_type at2 ON at2.equip_id = sb2.armor
        LEFT JOIN weapon_type wt3 ON wt3.equip_id = sb3.weapon
        LEFT JOIN armor_type at3 ON at3.equip_id = sb3.armor
        LEFT JOIN weapon_type wt4 ON wt4.equip_id = sb4.weapon
        LEFT JOIN armor_type at4 ON at4.equip_id = sb4.armor
        LEFT JOIN weapon_type wt5 ON wt5.equip_id = sb5.weapon
        LEFT JOIN armor_type at5 ON at5.equip_id = sb5.armor
      WHERE s.skill_idx = $1
    `, [skill.skillId]);

    await client.query('COMMIT');

    res.status(200).json(parseSkillPayload(result.rows));

  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
