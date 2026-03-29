import { getCollection, nextNumericId } from "../db.js";

const COLLECTION = "cargo";

const toNumberOrKeep = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : value;
};

export const getCargo = async (req, res) => {
  try {
    const rows = await getCollection(COLLECTION)
      .find({}, { projection: { _id: 0 } })
      .sort({ cargo_id: 1 })
      .toArray();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCargoById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const cargo = await getCollection(COLLECTION).findOne(
      { cargo_id: id },
      { projection: { _id: 0 } }
    );

    if (!cargo) return res.status(404).json({ message: "Cargo not found" });
    res.json(cargo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCargo = async (req, res) => {
  try {
    const { cargo_type, weight, voyage_id } = req.body;
    const cargo_id = await nextNumericId(COLLECTION, "cargo_id");

    const newCargo = {
      cargo_id,
      cargo_type,
      weight: toNumberOrKeep(weight),
      voyage_id: toNumberOrKeep(voyage_id),
    };

    await getCollection(COLLECTION).insertOne(newCargo);
    res.status(201).json(newCargo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCargo = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { cargo_type, weight, voyage_id } = req.body;

    const result = await getCollection(COLLECTION).updateOne(
      { cargo_id: id },
      {
        $set: {
          cargo_type,
          weight: toNumberOrKeep(weight),
          voyage_id: toNumberOrKeep(voyage_id),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Cargo not found" });
    }

    res.json({ message: "Cargo updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCargo = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await getCollection(COLLECTION).deleteOne({ cargo_id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Cargo not found" });
    }

    res.json({ message: "Cargo deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
