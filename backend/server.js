import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";

import shipRoutes from "./routes/shipRoutes.js";
import portRoutes from "./routes/portRoutes.js";
import voyageRoutes from "./routes/voyageRoutes.js";
import cargoRoutes from "./routes/cargoRoutes.js";
import crewRoutes from "./routes/crewRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/ships", shipRoutes);
app.use("/ports", portRoutes);
app.use("/voyages", voyageRoutes);
app.use("/cargo", cargoRoutes);
app.use("/crew", crewRoutes);

app.get("/health", (req, res) => {
  res.json({ message: "Backend is running" });
});

const PORT = Number(process.env.PORT) || 5000;

try {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
  });
} catch (err) {
  console.error("Failed to start backend:", err.message);
  process.exit(1);
}
