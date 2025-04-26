import express from "express";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";
import metricsRoutes from "./routes/metricsRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", contactRoutes);
app.use("/api/metrics", metricsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
