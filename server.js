const express = require("express");
const app = express();
const expressLayout = require("express-ejs-layouts");
const indexController = require("./routes/index");
const mongoose = require("mongoose");

const url = process.env.DATABASE_URL || "mongodb://localhost/mybrary";
const nada = null;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayout);
app.use(express.static("public"));

app.use("/", indexController);

//DATABASE
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to MongoDB..."));

app.listen(process.env.PORT || 3000, console.log("Listening on PORT 3000..."));
