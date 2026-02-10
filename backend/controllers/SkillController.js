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

  const result = await pool.query(`
    SELECT
        replace(s.skill_name, '^s', ' ') AS skill_name,
        st.skill_tooltip,
        s.train_point as skill_point,
        s.train_money as skill_money,
        s.range as range,
        s.equip as equiptype,
        s.unit_data_type as unitdata,
        s.animation_time,
        s.casting_time,
        s.area_data,
        s.skill_effect,
        s.mana,
        s.target,
        s.cool_time as cooldown,
        replace(sb1.skill_name, '^s', ' ') AS buffname1,
        s.rate_buff_1 as buffrate1,
        sb1.status_data_value as buffstatusdata1,
        sb1.delay_time as buffdelaytime1,
        se1.status_name as buffstatus1
    FROM 
        skills s
        JOIN skill_tooltip st ON st.skill_idx = s.skill_tooltip
        LEFT JOIN skills_buff sb1 ON s.buff_id_1 = sb1.skill_idx
        LEFT JOIN status_effect se1 ON sb1.status = se1.status_id
    WHERE 
        s.skill_idx = $1
  `, [skill.skillId]);

  res.status(200).json(parseSkillPayload(result.rows));
}
