const path = require("path");
const reqPath = path.join(__dirname, "../models/genre.model");

// logger
const { logger } = require("../../config/logger");

const Genre = require(reqPath);

// TODO JsDoc
exports.create = (req, res) => {
    // validate request
    if(!req.body?.name){
        logger.error("Name must not be empty.");
        res.status(400).send({message: "Name must not be empty!"});
        return;
    }

    // Create Genre
    const genre = new Genre({
        name: req.body.name
    });

    // Save Genre in the database
    genre.save(genre)
        .then((data) => {
            logger.info("Genre was created.");
            res.status(201).send(data);
        })
        .catch((err) => {
            logger.error("Some error occurred while creating the Genre:", err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Genre."
            });
        });
};

exports.findAll = (req, res) => {
    Genre.find({}, (err, genres) => {
        if(err){
            logger.error("Some error occurred while getting all Genres:", err);
            res.status(500).send({
                message: err.message || "Some error occured while getting all genres."
            });
        } else {            
            logger.info("All genres were received.");
            res.status(200).send(genres);
        }
    });
};