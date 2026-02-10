import pool from "../../db.js";

// ===============================
// GET ALL
// ===============================
export const getAllSkill = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        *
      FROM skills
      ORDER BY skill_idx ASC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch skills" });
  }
};

// ===============================
// GET BY ID
// ===============================
export const getSkillById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM skills WHERE skill_idx = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch skill" });
  }
};

// ===============================
// CREATE
// ===============================
export const createSkill = async (req, res) => {
  const {
    skill_name,
    train_point,
    train_money,
    range,
    equip,
    unit_data_type
  } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO skills 
      (skill_name, train_point, train_money, range, equip, unit_data_type)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [skill_name, train_point, train_money, range, equip, unit_data_type]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create skill" });
  }
};

// ===============================
// UPDATE
// ===============================
export const updateSkill = async (req, res) => {
  const { id } = req.params;
  const {
    skill_name,
    train_point,
    train_money,
    range,
    skill_tooltip,
    unit_data_type,
    buff_id_1,
    rate_buff_1,
    buff_id_2,
    rate_buff_2,
    buff_id_3,
    rate_buff_3,
    buff_id_4,
    rate_buff_4,
    buff_id_5,
    rate_buff_5,
    animation_time,
    cool_time,
    mana,
    life

  } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE 
        skills
      SET 
        skill_name = $1,
        train_point = $2,
        train_money = $3,
        range = $4,
        skill_tooltip = $5,
        unit_data_type = $6,
        buff_id_1 = $7,
        rate_buff_1 = $8,
        buff_id_2 = $9,
        rate_buff_2 = $10,
        buff_id_3 = $11,
        rate_buff_3 = $12,
        buff_id_4 = $13,
        rate_buff_4 = $14,
        buff_id_5 = $15,
        rate_buff_5 = $16,
        animation_time = $17,
        cool_time = $18,
        mana = $19,
        life = $20
      WHERE 
        skill_idx = $21
      RETURNING *
      `,
      [skill_name, train_point, train_money, range, skill_tooltip, unit_data_type, buff_id_1, rate_buff_1, buff_id_2, rate_buff_2, buff_id_3, rate_buff_3, buff_id_4, rate_buff_4, buff_id_5, rate_buff_5, animation_time, cool_time, mana, life
 ,id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update skill" });
  }
};

// ===============================
// DELETE
// ===============================
export const deleteSkill = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM skills WHERE skill_idx = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete skill" });
  }
};
