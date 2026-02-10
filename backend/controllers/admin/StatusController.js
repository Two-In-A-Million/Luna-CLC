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


// COPY status_effect (
//     status_name,
//     status_id
// )