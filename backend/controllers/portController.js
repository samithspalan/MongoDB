import { getCollection, nextNumericId } from "../db.js";

const COLLECTION = "port";

export const getPorts = async (req, res) => {
  try {
    const rows = await getCollection(COLLECTION)
      .find({}, { projection: { _id: 0 } })
      .sort({ port_id: 1 })
      .toArray();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPort = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const port = await getCollection(COLLECTION).findOne(
      { port_id: id },
      { projection: { _id: 0 } }
    );

    if (!port) return res.status(404).json({ message: "Port not found" });
    res.json(port);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPort = async (req, res) => {
  try {
    const { port_name, country } = req.body;
    const port_id = await nextNumericId(COLLECTION, "port_id");

    const newPort = { port_id, port_name, country };
    await getCollection(COLLECTION).insertOne(newPort);

    res.status(201).json(newPort);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePort = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { port_name, country } = req.body;

    const result = await getCollection(COLLECTION).updateOne(
      { port_id: id },
      { $set: { port_name, country } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Port not found" });
    }

    res.json({ message: "Port updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePort = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await getCollection(COLLECTION).deleteOne({ port_id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Port not found" });
    }

    res.json({ message: "Port deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
