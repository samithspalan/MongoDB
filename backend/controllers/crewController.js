import { getCollection, nextNumericId } from "../db.js";

const COLLECTION = "crew";

const toNumberOrKeep = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : value;
};

export const getCrew = async (req, res) => {
  try {
    const rows = await getCollection(COLLECTION)
      .find({}, { projection: { _id: 0 } })
      .sort({ crew_id: 1 })
      .toArray();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCrewById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const crew = await getCollection(COLLECTION).findOne(
      { crew_id: id },
      { projection: { _id: 0 } }
    );

    if (!crew) return res.status(404).json({ message: "Crew member not found" });
    res.json(crew);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCrew = async (req, res) => {
  try {
    const { crew_name, rank, joining_date, ship_id } = req.body;
    const crew_id = await nextNumericId(COLLECTION, "crew_id");

    const newCrew = {
      crew_id,
      crew_name,
      rank,
      joining_date,
      ship_id: toNumberOrKeep(ship_id),
    };

    await getCollection(COLLECTION).insertOne(newCrew);
    res.status(201).json(newCrew);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCrew = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { crew_name, rank, joining_date, ship_id } = req.body;

    const result = await getCollection(COLLECTION).updateOne(
      { crew_id: id },
      {
        $set: {
          crew_name,
          rank,
          joining_date,
          ship_id: toNumberOrKeep(ship_id),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Crew member not found" });
    }

    res.json({ message: "Crew updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCrew = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await getCollection(COLLECTION).deleteOne({ crew_id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Crew member not found" });
    }

    res.json({ message: "Crew deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
