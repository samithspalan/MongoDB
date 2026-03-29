import db from "../db.js";

export const getCrew = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM crew");
  res.json(rows);
};

export const getCrewById = async (req, res) => {
  const { id } = req.params;

  const [rows] = await db.query("SELECT * FROM crew WHERE crew_id = ?", [id]);
  res.json(rows[0]);
};

export const createCrew = async (req, res) => {
  const { crew_name, rank, joining_date, ship_id } = req.body;

  await db.query(
    "INSERT INTO crew (crew_name, rank, joining_date, ship_id) VALUES (?, ?, ?, ?)",
    [crew_name, rank, joining_date, ship_id]
  );

  res.json({ message: "Crew member added successfully" });
};

export const updateCrew = async (req, res) => {
  const { id } = req.params;
  const { crew_name, rank, joining_date, ship_id } = req.body;

  await db.query(
    "UPDATE crew SET crew_name=?, rank=?, joining_date=?, ship_id=? WHERE crew_id=?",
    [crew_name, rank, joining_date, ship_id, id]
  );

  res.json({ message: "Crew updated successfully" });
};

export const deleteCrew = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM crew WHERE crew_id=?", [id]);
    res.json({ message: "Crew deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
