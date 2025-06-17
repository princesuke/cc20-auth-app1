import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

const PORT = 3000;
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
