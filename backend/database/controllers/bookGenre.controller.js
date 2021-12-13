const path = require("path");
const reqPathBookGenre = path.join(__dirname, "../models/bookGenre.model");
const reqPathGenre = path.join(__dirname, "../models/genre.model");

// logger
const { logger } = require("../../config/logger");

const BookGenre = require(reqPathBookGenre);
const Genre = require(reqPathGenre);

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

exports.findByBookId = async (req, res) => {
    const bookId = req.params.bookId;

    let genreNameArray = [];

    await BookGenre.find({bookId}).exec()
        .then(async (bookGenres) => {
            for (const bookGenre of bookGenres) {
                await Genre.findById(bookGenre.genreId).exec()
                    .then((genre) => {
                        genreNameArray.push(genre.name);
                    })
                    .catch((err) => {
                        logger.error("Some error occurred while getting the genre with id: " + bookGenre.genreId);
                        logger.error(err);
                        
                        res.status(500).send({
                            message: err.message || "Some error occured while getting a genre."
                        });
                    });
            }
        })
        .catch((err) => {
            logger.error("Some error occurred while getting all BookGenres:", err);
            res.status(500).send({
                message: err.message || "Some error occured while getting all bookGenres."
            });
        });
        
    res.status(200).send(genreNameArray);
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