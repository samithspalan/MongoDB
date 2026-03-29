import { closeDB, connectDB, getCollection } from "../db.js";

const ships = [
  { ship_id: 1, ship_name: "Ocean Titan", ship_type: "Container", capacity: 12000, built_year: 2016 },
  { ship_id: 2, ship_name: "Blue Horizon", ship_type: "Bulk Carrier", capacity: 8500, built_year: 2012 },
  { ship_id: 3, ship_name: "Sea Falcon", ship_type: "Tanker", capacity: 15000, built_year: 2018 },
  { ship_id: 4, ship_name: "Coral Queen", ship_type: "Passenger", capacity: 3000, built_year: 2015 },
  { ship_id: 5, ship_name: "Iron Wave", ship_type: "Ro-Ro", capacity: 9200, built_year: 2019 }
];

const ports = [
  { port_id: 1, port_name: "Colombo Port", country: "Sri Lanka" },
  { port_id: 2, port_name: "Singapore Port", country: "Singapore" },
  { port_id: 3, port_name: "Dubai Port", country: "UAE" },
  { port_id: 4, port_name: "Hamburg Port", country: "Germany" },
  { port_id: 5, port_name: "Rotterdam Port", country: "Netherlands" }
];

const voyages = [
  { voyage_id: 1, voyage_name: "Eastern Trade Route", ship_id: 1, departure_port: "Colombo Port", arrival_port: "Singapore Port", departure_date: "2026-04-02", arrival_date: "2026-04-10" },
  { voyage_id: 2, voyage_name: "Desert Link", ship_id: 2, departure_port: "Singapore Port", arrival_port: "Dubai Port", departure_date: "2026-04-05", arrival_date: "2026-04-14" },
  { voyage_id: 3, voyage_name: "Euro Cargo Line", ship_id: 3, departure_port: "Dubai Port", arrival_port: "Hamburg Port", departure_date: "2026-04-08", arrival_date: "2026-04-20" },
  { voyage_id: 4, voyage_name: "Northern Passage", ship_id: 4, departure_port: "Hamburg Port", arrival_port: "Rotterdam Port", departure_date: "2026-04-12", arrival_date: "2026-04-16" },
  { voyage_id: 5, voyage_name: "Return Horizon", ship_id: 5, departure_port: "Rotterdam Port", arrival_port: "Colombo Port", departure_date: "2026-04-18", arrival_date: "2026-05-02" }
];

const cargos = [
  { cargo_id: 1, cargo_type: "Electronics", weight: 4200, voyage_id: 1 },
  { cargo_id: 2, cargo_type: "Grain", weight: 7000, voyage_id: 2 },
  { cargo_id: 3, cargo_type: "Fuel Drums", weight: 9800, voyage_id: 3 },
  { cargo_id: 4, cargo_type: "Vehicles", weight: 6100, voyage_id: 4 },
  { cargo_id: 5, cargo_type: "Textiles", weight: 3500, voyage_id: 5 }
];

const crew = [
  { crew_id: 1, crew_name: "Nimal Perera", rank: "Captain", joining_date: "2022-01-15", ship_id: 1 },
  { crew_id: 2, crew_name: "Kavinda Silva", rank: "Chief Engineer", joining_date: "2023-03-11", ship_id: 2 },
  { crew_id: 3, crew_name: "Ruwan Jayasuriya", rank: "Navigator", joining_date: "2021-07-22", ship_id: 3 },
  { crew_id: 4, crew_name: "Sadeera Fernando", rank: "Deck Officer", joining_date: "2024-02-01", ship_id: 4 },
  { crew_id: 5, crew_name: "Isuru Wickram", rank: "Radio Officer", joining_date: "2020-11-09", ship_id: 5 }
];

async function seedAll() {
  try {
    await connectDB();

    const shipCollection = getCollection("ship");
    const portCollection = getCollection("port");
    const voyageCollection = getCollection("voyage");
    const cargoCollection = getCollection("cargo");
    const crewCollection = getCollection("crew");

    await Promise.all([
      shipCollection.deleteMany({}),
      portCollection.deleteMany({}),
      voyageCollection.deleteMany({}),
      cargoCollection.deleteMany({}),
      crewCollection.deleteMany({}),
    ]);

    await shipCollection.insertMany(ships);
    await portCollection.insertMany(ports);
    await voyageCollection.insertMany(voyages);
    await cargoCollection.insertMany(cargos);
    await crewCollection.insertMany(crew);

    console.log("Seed completed: inserted 5 records into each collection.");
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exitCode = 1;
  } finally {
    await closeDB();
  }
}

seedAll();
