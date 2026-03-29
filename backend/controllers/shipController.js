import db from "../db.js";

export const getShips = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM ship");
  res.json(rows);
};

export const getShip = async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.query("SELECT * FROM ship WHERE ship_id = ?", [id]);
  res.json(rows[0]);
};

export const createShip = async (req, res) => {
  const { ship_name, ship_type, capacity, built_year } = req.body;
  const [result] = await db.query(
    "INSERT INTO ship (ship_name, ship_type, capacity, built_year) VALUES (?, ?, ?, ?)",
    [ship_name, ship_type, capacity, built_year]
  );

  // Return the inserted row so the frontend immediately knows the assigned id
  const insertId = result.insertId;
  const [rows] = await db.query("SELECT * FROM ship WHERE ship_id = ?", [insertId]);
  res.json(rows[0]);
};

export const updateShip = async (req, res) => {
  const { id } = req.params;
  const { ship_name, ship_type, capacity, built_year } = req.body;

  await db.query(
    "UPDATE ship SET ship_name=?, ship_type=?, capacity=?, built_year=? WHERE ship_id=?",
    [ship_name, ship_type, capacity, built_year, id]
  );
  res.json({ message: "Ship updated successfully" });
};

export const deleteShip = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM ship WHERE ship_id=?", [id]);
    res.json({ message: "Ship deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
    