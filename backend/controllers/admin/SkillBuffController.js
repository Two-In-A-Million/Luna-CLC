import pool from "../../db.js";

// ===============================
// GET ALL
// ===============================
export const getAllSkillBuff = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        sb.skill_idx,
        sb.skill_name,
        sb.skill_tooltip,
        se.status_name,
        se.status_id,
        sb.status_data_value,
        sb.delay_time
      FROM 
        skills_buff sb
        LEFT JOIN status_effect se
        ON sb.status = se.status_id
      ORDER BY skill_idx ASC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch skills buff" });
  }
};

// ===============================
// UPDATE
// ===============================
export const updateSkillBuff = async (req, res) => {
  const { id } = req.params;
  const {
    skill_tooltip,
    skill_name,
    status_id,
    status_data_value,
    delay_time
  } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE 
        skills_buff
      SET 
        skill_name = $1,
        skill_tooltip = $2,
        status = $3,
        status_data_value = $4,
        delay_time = $5
      WHERE 
        skill_idx = $6
      RETURNING *
      `,
      [skill_name, skill_tooltip, status_id, status_data_value, delay_time, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Skill buff not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update skill buff" });
  }
};
