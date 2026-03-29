import express from "express";
import cors from "cors";

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

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
