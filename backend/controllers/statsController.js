import { getCollection } from "../db.js";

export const getSummary = async (req, res) => {
  try {
    // Total number of ships
    const totalShips = await getCollection("ship")
      .countDocuments({});

    // Total number of active voyages (all voyages are considered active for now)
    // If you add a status field, you can filter by { status: { $in: ["Active", "In Progress"] } }
    const activeVoyages = await getCollection("voyage")
      .countDocuments({});

    // Crew distribution by rank
    const crewByRank = await getCollection("crew")
      .aggregate([
        {
          $group: {
            _id: "$rank",
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            rank: "$_id",
            count: 1
          }
        },
        { $sort: { rank: 1 } }
      ])
      .toArray();

    // Total cargo weight currently in transit
    const cargoMetrics = await getCollection("cargo")
      .aggregate([
        {
          $group: {
            _id: null,
            totalWeight: { $sum: "$weight" },
            cargoCount: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            totalWeight: 1,
            cargoCount: 1
          }
        }
      ])
      .toArray();

    const totalCargoWeight = cargoMetrics[0]?.totalWeight || 0;
    const totalCargoItems = cargoMetrics[0]?.cargoCount || 0;

    // Ship type distribution
    const shipTypeDistribution = await getCollection("ship")
      .aggregate([
        {
          $group: {
            _id: "$ship_type",
            count: { $sum: 1 },
            totalCapacity: { $sum: "$capacity" }
          }
        },
        {
          $project: {
            _id: 0,
            name: "$_id",
            value: "$count",
            totalCapacity: 1
          }
        },
        { $sort: { name: 1 } }
      ])
      .toArray();

    // Cargo type distribution
    const cargoTypeDistribution = await getCollection("cargo")
      .aggregate([
        {
          $group: {
            _id: "$cargo_type",
            count: { $sum: 1 },
            totalWeight: { $sum: "$weight" }
          }
        },
        {
          $project: {
            _id: 0,
            name: "$_id",
            value: "$count",
            totalWeight: 1
          }
        },
        { $sort: { name: 1 } }
      ])
      .toArray();

    // Voyages by ship
    const voyagesByShip = await getCollection("voyage")
      .aggregate([
        {
          $group: {
            _id: "$ship_id",
            voyageCount: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: "ship",
            localField: "_id",
            foreignField: "ship_id",
            as: "shipDetails"
          }
        },
        {
          $unwind: {
            path: "$shipDetails",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            _id: 0,
            shipId: "$_id",
            shipName: { $ifNull: ["$shipDetails.ship_name", "Unknown"] },
            voyageCount: 1
          }
        },
        { $sort: { voyageCount: -1 } }
      ])
      .toArray();

    res.json({
      summary: {
        totalShips,
        activeVoyages,
        totalCargoWeight,
        totalCargoItems
      },
      crewByRank,
      shipTypeDistribution,
      cargoTypeDistribution,
      voyagesByShip
    });
  } catch (err) {
    console.error("Stats summary error:", err);
    res.status(500).json({ error: err.message });
  }
};
