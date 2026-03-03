import pool from "../../db.js";

// ===============================
// GET ALL
// ===============================
export const getAllSkillTooptip = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        skill_tooltip,
        skill_idx as skill_id
      FROM skill_tooltip
      GROUP BY skill_idx, skill_tooltip
      HAVING COUNT(*) > 1
      ORDER BY skill_idx ASC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch skills tooltip" });
  }
};

// ===============================
// UPDATE
// ===============================
export const updateTooltip = async (req, res) => {
  const { id } = req.params;
  const {
    skill_tooltip
  } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE 
        skill_tooltip
      SET 
        skill_tooltip = $1
      WHERE 
        skill_idx = $2
      RETURNING *
      `,
      [skill_tooltip, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Tooltip not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update tooltip" });
  }
};
