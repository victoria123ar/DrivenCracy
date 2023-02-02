import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.DATABASE_URL;
mongoose.set("strictQuery", false);
mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;
db.once("open", () => {
  console.log("Database conectada:", url);
});

db.on("error", (err) => {
  console.error("Erro ao conectar na Database:", err);
});

export default db
