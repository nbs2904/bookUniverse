module.exports = (app) => {
    const subModel = require("../database/controllers/subModel.controller");

    const router = require("express").Router();

    router.post("/", subModel.create);
    router.get("/", subModel.findAll);
    router.get("/:id", subModel.findById);

    app.use("/api/subModel", router);

};