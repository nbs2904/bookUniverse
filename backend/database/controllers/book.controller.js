const path = require("path");
const reqPath = path.join(__dirname, "../models/book.model");

// logger
const { logger } = require("../../config/logger");

const Book = require(reqPath);

const { ObjectId } = require("mongoose").Types;

// TODO JsDoc
exports.create = (req, res) => {
    // validate request
    if(!req.body?.title || !req.body?.ISBN13 || !req.body?.authors || !req.body?.content){
        logger.error("At least one required element is empty:");
        logger.error(`Title: ${req.body?.title}, ISBN13: ${req.body?.ISBN13}, Authors: ${req.body?.authors}, Content: ${req.body?.content}`);
        res.status(400).send({message: "Title, ISBN13, authors and content must not be empty!"});
        return;
    }

    // Create Book
    const book = new Book({
        title: req.body.title,
        subtitle: req.body.subtitle,
        pageCount: req.body.pageCount,
        ISBN13: req.body.ISBN13,
        coverUrl: req.body.coverUrl,
        language: req.body.language,
        content: req.body.content,
        authors: req.body.authors
    });

    // Save Book in the database
    book.save(book)
        .then((data) => {
            logger.info("Book was created.");
            res.status(201).send(data);
        })
        .catch((err) => {
            logger.error("Some error occurred while creating the Book:", err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Book."
            });
        });
};

exports.findAll = (req, res) => {
    Book.aggregate([
        {$lookup: {
            from: "bookgenres",
            as: "bookgenres",
            let: {book_id: "$_id"},
            pipeline: [
                {$match: {$expr: {$and: [{$eq: ["$bookId", "$$book_id"]}]}}},
                {$lookup: {
                    from: "genres",
                    as: "genres",
                    let: {bookGenre_genreId: "$genreId"},
                    pipeline: [
                        {$match: {$expr: {$and: [{$eq: ["$_id", "$$bookGenre_genreId"]}]}}}
                    ]
                }},
                {$project: {
                    genres: {
                        $map: {
                            input: "$genres",
                            as: "genres",
                            in: "$$genres.name"
                        }
                    }
                }}
            ]
        }},
        {$project: {
            _id: 1,
            title: 1,
            subtitle: 1,
            pageCount: 1,
            ISBN13: 1,
            coverUrl: 1,
            authors: 1,
            language: 1,
            description: 1,
            genres: {
                $map: {
                    input: "$bookgenres",
                    as: "bookgenres",
                    in: {
                        $reduce: {
                            input: "$$bookgenres.genres",
                            initialValue: "",
                            in: {$concat: ["$$value", "$$this"]}
                        }
                    }
                }
            }
        }}
    ], (err, data) => {
        if(err) {
            logger.error("Some error occurred while getting all books:", err);
            res.status(500).send({
                message: err.message || "Some error occured while getting all books."
            });
        } else {            
            logger.info("All books were received.");
            res.status(200).send(data);
        }
    });
};

exports.findById = (req, res) => {
    const id = ObjectId(req.params.id);

    Book.aggregate([
        {$match: {"_id": id}},
        {$lookup: {
            from: "bookgenres",
            as: "bookgenres",
            let: {book_id: "$_id"},
            pipeline: [
                {$match: {$expr: {$and: [{$eq: ["$bookId", "$$book_id"]}]}}},
                {$lookup: {
                    from: "genres",
                    as: "genres",
                    let: {bookGenre_genreId: "$genreId"},
                    pipeline: [
                        {$match: {$expr: {$and: [{$eq: ["$_id", "$$bookGenre_genreId"]}]}}}
                    ]
                }},
                {$project: {
                    genres: {
                        $map: {
                            input: "$genres",
                            as: "genres",
                            in: "$$genres.name"
                        }
                    }
                }}
            ]
        }},
        {$project: {
            _id: 1,
            title: 1,
            subtitle: 1,
            pageCount: 1,
            ISBN13: 1,
            coverUrl: 1,
            authors: 1,
            language: 1,
            description: 1,
            genres: {
                $map: {
                    input: "$bookgenres",
                    as: "bookgenres",
                    in: {
                        $reduce: {
                            input: "$$bookgenres.genres",
                            initialValue: "",
                            in: {$concat: ["$$value", "$$this"]}
                        }
                    }
                }
            }
        }}
    ], (err, data) => {
        if(err) {
            logger.error("Request failed:", err);
            res.status(500).send({message: "Something went wrong with retrieving the book."});
        } else if(!data) {
            logger.warn("Book could not be found.");
            res.status(404).send({message: `Book with id ${id} could not be found.`});
        } else {
            logger.info("Book was found.");
            res.status(200).send(data[0]);
        }
    });
};