import pool from "../../db.js";

// ===============================
// GET ALL
// ===============================
export const getAllJobSkills = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        js.job_id,
        j.job_name,
        js.skill_id,
        s.skill_name,
        j.race
      FROM 
        job_skill js
        JOIN job_list j ON j.job_id = js.job_id
        JOIN skills s ON js.skill_id = s.skill_idx
      ORDER BY
        job_id,
        race,
        job_name,
        skill_name
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch jobs skill" });
  }
};

// ===============================
// UPDATE
// ===============================
export const updateJobSkill = async (req, res) => {
  const {
    new_job_id,
    new_skill_id,
    old_job_id,
    old_skill_id
  } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE 
        job_skill
      SET 
        job_id = $1,
        skill_id = $2
      WHERE 
        job_id = $3
        AND skill_id = $4
      RETURNING *
      `,
      [ new_job_id, new_skill_id, old_job_id, old_skill_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Job skill not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update job skill" });
  }
};
