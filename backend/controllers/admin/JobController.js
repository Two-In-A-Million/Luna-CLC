import pool from "../../db.js";

// ===============================
// GET ALL
// ===============================
export const getAllJobs = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        job_id,
        job_name,
        race,
        level
      FROM 
        job_list
      ORDER BY
        job_id,
        race,
        job_name,
        level
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

// ===============================
// UPDATE
// ===============================
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const {
    job_name,
    race,
    level
  } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE 
        job_list
      SET 
        job_name = $1,
        level = $2,
        race = $3
      WHERE 
        job_id = $4
      RETURNING *
      `,
      [job_name, level, race, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update job" });
  }
};
