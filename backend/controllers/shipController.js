import { getCollection, nextNumericId } from "../db.js";

const COLLECTION = "ship";

const toNumberOrKeep = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : value;
};

export const getShips = async (req, res) => {
  try {
    const rows = await getCollection(COLLECTION)
      .find({}, { projection: { _id: 0 } })
      .sort({ ship_id: 1 })
      .toArray();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getShip = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const ship = await getCollection(COLLECTION).findOne(
      { ship_id: id },
      { projection: { _id: 0 } }
    );

    if (!ship) return res.status(404).json({ message: "Ship not found" });
    res.json(ship);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createShip = async (req, res) => {
  try {
    const { ship_name, ship_type, capacity, built_year } = req.body;
    const ship_id = await nextNumericId(COLLECTION, "ship_id");

    const newShip = {
      ship_id,
      ship_name,
      ship_type,
      capacity: toNumberOrKeep(capacity),
      built_year: toNumberOrKeep(built_year),
    };

    await getCollection(COLLECTION).insertOne(newShip);
    res.status(201).json(newShip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateShip = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { ship_name, ship_type, capacity, built_year } = req.body;

    const result = await getCollection(COLLECTION).updateOne(
      { ship_id: id },
      {
        $set: {
          ship_name,
          ship_type,
          capacity: toNumberOrKeep(capacity),
          built_year: toNumberOrKeep(built_year),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Ship not found" });
    }

    res.json({ message: "Ship updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteShip = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await getCollection(COLLECTION).deleteOne({ ship_id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Ship not found" });
    }
    res.json({ message: "Ship deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
    