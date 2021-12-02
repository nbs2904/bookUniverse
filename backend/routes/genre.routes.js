module.exports = (app) => {
    const genre = require("../database/controllers/genre.controller");

    const router = require("express").Router();

    // Create new Genre
    // TODO https://www.bezkoder.com/node-express-mongodb-crud-rest-api/
    router.post("/", genre.create);
    router.get("/", genre.findAll);

    app.use("/api/genre", router);

};