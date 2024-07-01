import express from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (_req, res) => {
  res.send({
    message: "Welcome to Medilog Server",
    docs: "https://docs.Medilog.com",
  });
});

app.use("/user", userRoutes);

export default app;
