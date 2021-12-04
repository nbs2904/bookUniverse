module.exports = (app) => {
    const user = require("../database/controllers/user.controller");
    const router = require("express").Router();

    router.post("/", user.create);
    router.get("/:id", user.findById);
    router.put("/:id", user.update);

    app.use("/api/user", router);

};