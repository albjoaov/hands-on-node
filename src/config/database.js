// const mongoose = require("mongoose");
import mongoose from "mongoose"

mongoose.connect("mongodb://localhost:27017/handson");

let database = mongoose.connection;

export default database;
