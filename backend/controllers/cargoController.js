import db from "../db.js";

export const getCargo = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM cargo");
  res.json(rows);
};

export const getCargoById = async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.query("SELECT * FROM cargo WHERE cargo_id = ?", [
    id,
  ]);
  res.json(rows[0]);
};

export const createCargo = async (req, res) => {
  const { cargo_type, weight, voyage_id } = req.body;

  await db.query(
    "INSERT INTO cargo (cargo_type, weight, voyage_id) VALUES (?, ?, ?)",
    [cargo_type, weight, voyage_id]
  );

  res.json({ message: "Cargo added successfully" });
};

export const updateCargo = async (req, res) => {
  const { id } = req.params;
  const { cargo_type, weight, voyage_id } = req.body;

  await db.query(
    "UPDATE cargo SET cargo_type=?, weight=?, voyage_id=? WHERE cargo_id=?",
    [cargo_type, weight, voyage_id, id]
  );

  res.json({ message: "Cargo updated successfully" });
};

export const deleteCargo = async (req, res) => {
  const { id } = req.params;

  await db.query("DELETE FROM cargo WHERE cargo_id=?", [id]);
  res.json({ message: "Cargo deleted successfully" });
};
