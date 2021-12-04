module.exports = (app) => {
    const userGenre = require("../database/controllers/userGenre.controller");

    const router = require("express").Router();

    router.post("/", userGenre.create);
    router.get("/:userId", userGenre.findByUserId);
    router.delete("/:id", userGenre.delete);

    app.use("/api/userGenre", router);

};