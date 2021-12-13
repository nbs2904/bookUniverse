module.exports = (app) => {
    const paymentMethod = require("../database/controllers/paymentMethod.controller");

    const router = require("express").Router();

    router.post("/", paymentMethod.create);
    router.get("/", paymentMethod.findAll);
    router.get("/:id", paymentMethod.findById);

    app.use("/api/paymentMethod", router);

};