import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pollRoutes from "./routes/pollRoutes.js";
import choiceRoutes from "./routes/choiceRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(pollRoutes);
app.use(choiceRoutes);
app.use(voteRoutes);
app.use(resultRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Servidor está rodando na porta ${port}`));