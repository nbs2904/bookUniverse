const mongoose = require("mongoose");

// logger
const { logger } = require("../config/logger");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSWD}@bookuniverse.3i3gd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// models
db.book = require("./models/book.model");
db.bookGenre = require("./models/bookGenre.model");
db.borrowed = require("./models/borrowed.model");
db.genre = require("./models/genre.model");
db.paymentMethod = require("./models/paymentMethod.model");
db.subModel = require("./models/subModel.model");
db.user = require("./models/user.model");
db.userGenre = require("./models/userGenre.model");

db.mongoose.connect(db.url).then(() => {
    logger.info("Connected to database.");
}).catch((err) => {
    logger.error("Cannot connect to database:", err);
    
    process.exit();
});

module.exports = db;

