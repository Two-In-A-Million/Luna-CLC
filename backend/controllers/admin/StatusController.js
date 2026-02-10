import pool from "../../db.js";

// ===============================
// GET ALL
// ===============================
export const getAllStatusEffect= async (req, res) => {
  try {
    const result = await pool.query(`
        SELECT 
            status_name,
            status_id
        FROM 
            status_effect
        ORDER BY
            status_name
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch Status Effect" });
  }
};


// ===============================
// UPDATE
// ===============================
export const updateStatusEffect = async (req, res) => {
  const { id } = req.params;
  const {
    status_name
  } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE 
        status_effect
      SET 
        status_name = $1
      WHERE 
        status_id = $2
      RETURNING *
      `,
      [status_name, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Status Effect not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update Status Effect" });
  }
};