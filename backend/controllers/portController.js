import db from "../db.js";

export const getPorts = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM port");
  res.json(rows);
};

export const getPort = async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.query("SELECT * FROM port WHERE port_id = ?", [id]);
  res.json(rows[0]);
};

export const createPort = async (req, res) => {
  const { port_name, country } = req.body;
  await db.query(
    "INSERT INTO port (port_name, country) VALUES (?, ?)",
    [port_name, country]
  );
  res.json({ message: "Port added successfully" });
};

export const updatePort = async (req, res) => {
  const { id } = req.params;
  const { port_name, country } = req.body;

  await db.query(
    "UPDATE port SET port_name=?, country=? WHERE port_id=?",
    [port_name, country, id]
  );
  res.json({ message: "Port updated" });
};

export const deletePort = async (req, res) => {
  const { id } = req.params;

  await db.query("DELETE FROM port WHERE port_id=?", [id]);
  res.json({ message: "Port deleted" });
};
