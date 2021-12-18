require("dotenv").config({path: __dirname+"/.env"});
const path = require("path");

// TODO check if every npm package is needed
// TODO check if npm scripts can be optimised
// TODO check on different machine

require("./database/db.config");

// import custom logger
const { logger } = require("./config/logger");

const express = require("express");
const app = express();

// get environment variables
const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;

// middleware
app.use(express.json());

// routes
require("./routes/genre.routes")(app);
require("./routes/subModel.routes")(app);
require("./routes/paymentMethod.routes")(app);
require("./routes/book.routes")(app);
require("./routes/bookGenre.routes")(app);
require("./routes/borrowed.routes")(app);
require("./routes/userGenre.routes")(app);
require("./routes/user.routes")(app);

// if in production use static files from build folder
if(ENV === "production"){
    logger.info("Environment:", `"${ENV}"`);
    app.use(express.static(path.join(__dirname, "../dist/bookUniverse")));
    
    app.get("*", (req, res) => {
        return res.sendFile(path.join(__dirname, "../dist/bookUniverse/index.html"));
    });
} else {
    logger.info("Environment:", `"${ENV}"`);
    app.get("/", (req, res) => {
        res.send("Welcome to Backend API");
    });
}

const server  = app.listen(PORT || 3000, () => {    
    logger.info("App listening on port 3000.");
});

//  stop function used by unit tests
function stop() {
    server.close(() => {
        logger.info("Server shutting down.");
    });

    server.getConnections.close;
}

module.exports = server;
module.exports.stop = stop;