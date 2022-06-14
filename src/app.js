import express from "express"
import database from "./config/database.js"
import dotenv from "dotenv-safe"

dotenv.config()

database.on("open", () => console.log("Conexão com o MongoDB feita com sucesso!"));
database.on("error", () => console.log("Conexão com o MongoDB quebrada! Houve um erro: "));

const app = express();

export default app;
// module.exports = app;