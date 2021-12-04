module.exports = (app) => {
    const borrowed = require("../database/controllers/borrowed.controller");

    const router = require("express").Router();

    router.post("/", borrowed.create);
    router.get("/:id", borrowed.findById);
    router.put("/:id", borrowed.update);
    router.get("/user/:userId", borrowed.findByUserId);

    app.use("/api/borrowed", router);

};