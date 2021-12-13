module.exports = (app) => {
    const genre = require("../database/controllers/genre.controller");

    const router = require("express").Router();

    router.post("/", genre.create);
    router.get("/", genre.findAll);

    app.use("/api/genre", router);

};