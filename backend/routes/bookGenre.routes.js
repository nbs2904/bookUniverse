module.exports = (app) => {
    const book = require("../database/controllers/bookGenre.controller");

    const router = require("express").Router();

    // Create new BookGenre
    // TODO https://www.bezkoder.com/node-express-mongodb-crud-rest-api/
    router.post("/", book.create);
    router.get("/bookId/:bookId", book.findByBookId);
    router.get("/genreId/:genreId", book.findByGenreId);

    app.use("/api/bookGenre", router);

};