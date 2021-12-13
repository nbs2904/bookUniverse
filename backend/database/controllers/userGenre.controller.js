const path = require("path");
const reqPath = path.join(__dirname, "../models/userGenre.model");

// logger
const { logger } = require("../../config/logger");

const UserGenre = require(reqPath);

// TODO JsDoc
exports.create = (req, res) => {
    // validate request
    if(!req.body?.userId || !req.body?.genreId){
        logger.error("UserId or GenreId is empty.");
        res.status(400).send({message: "UserId or GenreId is empty."});
        return;
    }

    // Create Genre
    const userGenre = new UserGenre({
        userId: req.body.userId,
        genreId: req.body.genreId
    });

    // Save Genre in the database
    userGenre.save(userGenre)
        .then((data) => {
            logger.info("userGenre was created.");
            res.status(201).send(data);
        })
        .catch((err) => {
            logger.error("Some error occurred while creating the userGenre entry:", err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating the userGenre entry."
            });
        });
};

exports.findByUserId = (req, res) => {
    const userId = req.params.userId;

    UserGenre.find({userId}, (err, userGenres) => {
        if(err){
            logger.error("Some error occurred while getting all UserGenres:", err);
            res.status(500).send({
                message: err.message || "Some error occured while getting all userGenres."
            });
        } else {
            let userGenreMap = {};
    
            userGenres.forEach(userGenre => {
                userGenreMap[userGenre._id] = userGenre;
            });
            
            logger.info("All genres were received.");
            res.status(200).send(userGenreMap);
        }
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    UserGenre.findByIdAndRemove(id)
        .then((data) => {
            if(!data) {
                logger.warn(`Cannot delete userGenre entry with id: ${id}.`);
                res.status(404).send({
                    message: `Cannot delete userGenre entry with id: ${id}.`
                });
            } else {
                logger.info("UserGenre entey was succesfully deleted.");
                res.send({
                    message: "UserGenre was deleted successfully."
                });
            }
        })
        .catch((err) => {
            logger.error(`Cannot delete userGenre entry with id: ${id}.`, err);
            res.status(500).send({
                message: `Could not delete userGenre entry with id: ${id}`
            });
        });
};