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
require("./routes/genre.routes")(app);
require("./routes/subModel.routes")(app);
require("./routes/paymentMethod.routes")(app);
require("./routes/book.routes")(app);
require("./routes/bookGenre.routes")(app);
require("./routes/borrowed.routes")(app);
require("./routes/userGenre.routes")(app);
require("./routes/user.routes")(app);


app.get("/", (req, res) => {
    res.send("Welcome to Node API");
});

app.listen(PORT || 3000, () => {
    logger.info("App listening on port 3000.");
});

app.get("/getData", (req, res) => {
    res.json({"message": "Hello World"});
});