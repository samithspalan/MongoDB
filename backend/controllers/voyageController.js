import { getCollection, nextNumericId } from "../db.js";

const COLLECTION = "voyage";

const toNumberOrKeep = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : value;
};

export const getVoyages = async (req, res) => {
  try {
    const rows = await getCollection(COLLECTION)
      .find({}, { projection: { _id: 0 } })
      .sort({ voyage_id: 1 })
      .toArray();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getVoyage = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const voyage = await getCollection(COLLECTION).findOne(
      { voyage_id: id },
      { projection: { _id: 0 } }
    );

    if (!voyage) return res.status(404).json({ message: "Voyage not found" });
    res.json(voyage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createVoyage = async (req, res) => {
  try {
    const {
      voyage_name,
      ship_id,
      departure_port,
      arrival_port,
      departure_date,
      arrival_date,
    } = req.body;

    const voyage_id = await nextNumericId(COLLECTION, "voyage_id");
    const newVoyage = {
      voyage_id,
      voyage_name,
      ship_id: toNumberOrKeep(ship_id),
      departure_port,
      arrival_port,
      departure_date,
      arrival_date,
    };

    await getCollection(COLLECTION).insertOne(newVoyage);
    res.status(201).json(newVoyage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateVoyage = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const {
      voyage_name,
      ship_id,
      departure_port,
      arrival_port,
      departure_date,
      arrival_date,
    } = req.body;

    const result = await getCollection(COLLECTION).updateOne(
      { voyage_id: id },
      {
        $set: {
          voyage_name,
          ship_id: toNumberOrKeep(ship_id),
          departure_port,
          arrival_port,
          departure_date,
          arrival_date,
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Voyage not found" });
    }

    res.json({ message: "Voyage updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteVoyage = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await getCollection(COLLECTION).deleteOne({ voyage_id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Voyage not found" });
    }

    res.json({ message: "Voyage deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
