import express from "express";
import demoRoutes from "./routes/demoRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/demo", demoRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});