module.exports = (app) => {
    const book = require("../database/controllers/book.controller");

    const router = require("express").Router();

    router.post("/", book.create);
    router.get("/", book.findAll);
    router.get("/:id", book.findById);

    app.use("/api/book", router);
};