require("dotenv").config({path: __dirname+"/.env"});

// logger
const { logger } = require("./config/logger");

const express = require("express");
const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json());

const db = require("./database/db.config");

// routes
// TODO add all routers
require("./routes/genre.routes")(app);


app.get("/", (req, res) => {
    res.send("Welcome to Node API");
});

app.listen(PORT || 3000, () => {
    logger.info("App listening on port 3000.");
});

app.get("/getData", (req, res) => {
    res.json({"message": "Hello World"});
});