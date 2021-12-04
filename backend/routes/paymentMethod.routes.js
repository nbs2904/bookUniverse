module.exports = (app) => {
    const paymentMethod = require("../database/controllers/paymentMethod.controller");

    const router = require("express").Router();

    // Create new PaymentMethod
    // TODO https://www.bezkoder.com/node-express-mongodb-crud-rest-api/
    router.post("/", paymentMethod.create);
    router.get("/", paymentMethod.findAll);
    router.get("/:id", paymentMethod.findById);

    app.use("/api/paymentMethod", router);

};