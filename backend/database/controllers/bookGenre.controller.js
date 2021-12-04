const path = require("path");
const reqPath = path.join(__dirname, "../models/bookGenre.model");

// logger
const { logger } = require("../../config/logger");

const BookGenre = require(reqPath);

// TODO JsDoc
exports.create = (req, res) => {
    // validate request
    if(!req.body?.bookId || !req.body?.genreId){
        logger.error("BookId or GenreId is empty.");
        res.status(400).send({message: "BookId or GenreId is empty."});
        return;
    }

    // Create Genre
    const bookGenre = new BookGenre({
        bookId: req.body.bookId,
        genreId: req.body.genreId
    });

    // Save Genre in the database
    bookGenre.save(bookGenre)
        .then((data) => {
            logger.info("bookGenre was created.");
            res.status(201).send(data);
        })
        .catch((err) => {
            logger.error("Some error occurred while creating the bookGenre entry:", err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating the bookGenre entry."
            });
        });
};

exports.findByBookId = (req, res) => {
    const bookId = req.params.bookId;

    BookGenre.find({bookId}, (err, bookGenres) => {
        if(err){
            logger.error("Some error occurred while getting all BookGenres:", err);
            res.status(500).send({
                message: err.message || "Some error occured while getting all bookGenres."
            });
        } else {
            let bookGenreMap = {};
    
            bookGenres.forEach(bookGenre => {
                bookGenreMap[bookGenre._id] = bookGenre;
            });
            
            logger.info("All genres were received.");
            res.status(200).send(bookGenreMap);
        }
    });
};

exports.findByGenreId = (req, res) => {
    const genreId = req.params.genreId;

    BookGenre.find({genreId}, (err, bookGenres) => {
        if(err){
            logger.error("Some error occurred while getting all BookGenres:", err);
            res.status(500).send({
                message: err.message || "Some error occured while getting all bookGenres."
            });
        } else {
            let bookGenreMap = {};
    
            bookGenres.forEach(bookGenre => {
                bookGenreMap[bookGenre._id] = bookGenre;
            });
            
            logger.info("All books were received.");
            res.status(200).send(bookGenreMap);
        }
    });
};