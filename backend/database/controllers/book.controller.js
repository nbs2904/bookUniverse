const path = require("path");
const reqPath = path.join(__dirname, "../models/book.model");

// logger
const { logger } = require("../../config/logger");

const Book = require(reqPath);

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
    Book.find({}, (err, books) => {
        if(err) {
            logger.error("Some error occurred while getting all books:", err);
            res.status(500).send({
                message: err.message || "Some error occured while getting all books."
            });
        } else {
            let bookMap = {};

            books.forEach(book => {
                bookMap[book._id] = book;
            });
            
            logger.info("All books were received.");
            res.status(200).send(bookMap);
        }
    });
};

exports.findById = (req, res) => {
    const id = req.params.id;

    Book.findById(id)
        .then((data) => {
            if(!data) {
                logger.error("Book could not be found.");
                res.status(404).send({message: `Book with id ${id} could not be found.`});
            } else {
                logger.info("Book was found.");
                res.status(200).send(data);
            }
        })
        .catch(((err) => {
            logger.error("Request failed:", err);
            res.status(500).send({message: "Something went wrong with retrieving the book."});
        }));
};