import db from "../db.js";

export const getVoyages = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM voyage");
  res.json(rows);
};

export const getVoyage = async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.query("SELECT * FROM voyage WHERE voyage_id = ?", [
    id,
  ]);
  res.json(rows[0]);
};

export const createVoyage = async (req, res) => {
  const {
    voyage_name,
    ship_id,
    departure_port,
    arrival_port,
    departure_date,
    arrival_date,
  } = req.body;

  await db.query(
    `INSERT INTO voyage 
    (voyage_name, ship_id, departure_port, arrival_port, departure_date, arrival_date)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      voyage_name,
      ship_id,
      departure_port,
      arrival_port,
      departure_date,
      arrival_date,
    ]
  );

  res.json({ message: "Voyage added successfully" });
};

export const updateVoyage = async (req, res) => {
  const { id } = req.params;
  const {
    voyage_name,
    ship_id,
    departure_port,
    arrival_port,
    departure_date,
    arrival_date,
  } = req.body;

  await db.query(
    `UPDATE voyage SET 
    voyage_name=?, ship_id=?, departure_port=?, arrival_port=?, 
    departure_date=?, arrival_date=?
    WHERE voyage_id=?`,
    [
      voyage_name,
      ship_id,
      departure_port,
      arrival_port,
      departure_date,
      arrival_date,
      id,
    ]
  );

  res.json({ message: "Voyage updated successfully" });
};

export const deleteVoyage = async (req, res) => {
  const { id } = req.params;

  await db.query("DELETE FROM voyage WHERE voyage_id=?", [id]);
  res.json({ message: "Voyage deleted successfully" });
};
