// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import orderRoutes from "./routes/orders.js";
import farmersRoute from "./routes/farmers.js";
import buyersRoute from "./routes/buyers.js";
import agentsRoute from "./routes/agents.js";
import authRoute from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);
app.use("/api/farmers", farmersRoute);
app.use("/api/buyers", buyersRoute);
app.use("/api/agents", agentsRoute);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => res.send("✅ Mon Jardin ERP Backend Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
