require("dotenv").config({path: __dirname+"/.env"});

// logger
const { logger } = require("./config/logger");

const express = require("express");
const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json());

require("./database/db.config");

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

const server  = app.listen(PORT || 3000, () => {    
    logger.info("App listening on port 3000.");
});

function stop() {
    server.close(() => {
        logger.info("Server shutting down.");
    });
    server.getConnections.close;
}

module.exports = server;
module.exports.stop = stop;