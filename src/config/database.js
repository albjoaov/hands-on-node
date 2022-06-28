import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/handson2")

let db = mongoose.connection

export default db;