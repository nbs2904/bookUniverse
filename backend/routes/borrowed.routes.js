module.exports = (app) => {
    const borrowed = require("../database/controllers/borrowed.controller");

    const router = require("express").Router();

    router.post("/", borrowed.create);
    router.get("/:userId", borrowed.findByUserId);
    router.put("/:id", borrowed.update);
    router.get("/borrowedBookIds/:userId", borrowed.borrowedBookIds);
    router.get("/borrowdBookInfo/:id", borrowed.borrowedBookInfoByEntryId);
    router.get("/borrowdBookInfo/:userId/:bookId", borrowed.borrowedBookInfo);

    app.use("/api/borrowed", router);

};