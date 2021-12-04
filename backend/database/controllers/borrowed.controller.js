const path = require("path");
const reqPath = path.join(__dirname, "../models/borrowed.model");

// logger
const { logger } = require("../../config/logger");

const Borrowed = require(reqPath);

// TODO JsDoc
exports.create = (req, res) => {
    // validate request
    if(!req.body?.userId || !req.body?.bookId || !req.body?.startDate || !req.body?.endDate || (!req.body?.progress && req.body?.progress != 0)){
        logger.error("At least one required element is empty:");
        logger.error(`UserId: ${req.body?.userId}, BookId: ${req.body?.bookId}, StartDate: ${req.body?.startDate}, EndDate: ${req.body?.endDate}, Progress: ${req.body?.progress}`);
        
        res.status(400).send({message: "UserId, BookId, StartDate, EndDate and Progress must not be empty!"});
        return;
    }

    // Create Borrowed Entry
    const borrowed = new Borrowed({
        userId: req.body.userId,
        bookId: req.body.bookId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        progress: req.body.progress,
    });

    // Save Genre in the database
    borrowed.save(borrowed)
        .then((data) => {
            logger.info("Borrowed entry was created.");
            res.status(201).send(data);
        })
        .catch((err) => {
            logger.error("Some error occurred while creating the borrowed entry:", err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating the borrowed entry."
            });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id;

    Borrowed.findById(id)
        .then((data) => {
            if(!data) {
                logger.error("Borrowed entry could not be found.");
                res.status(404).send({message: `Borrowed entry with id ${id} could not be found.`});
            } else {
                logger.info("Borrowed entry was found.");
                res.status(200).send(data);
            }
        })
        .catch(((err) => {
            logger.error("Request failed:", err);
            res.status(500).send({message: "Something went wrong with retrieving the borrowed entry."});
        }));
};

exports.findByUserId = (req, res) => {
    const userId = req.params.userId;

    Borrowed.find({userId}, (err, borrowedList) => {
        if(err){
            logger.error("Some error occurred while getting all borrowed entries:", err);
            res.status(500).send({
                message: err.message || "Some error occured while getting all borrowed entries."
            });
        } else {
            let borrowedMap = {};
    
            borrowedList.forEach(borrowed => {
                borrowedMap[borrowed._id] = borrowed;
            });
            
            logger.info("All borrowed entries were received.");
            res.status(200).send(borrowedMap);
        }
    });
};

exports.update = (req, res) => {
    if(!req.body) {
        logger.error("Data to update was empty:", req.body);
        return res.status(400).send({
            message:"Data to update must not be empty."
        });
    }

    const id = req.params.id;

    
    if("startDate" in req.body){
        if(req.body.startDate.length < 1){
            return res.status(400).send({
                message: "New startDate must not be of length 0"
            });
        }
    }
    if("endDate" in req.body){
        if(req.body.endDate.length < 1){
            return res.status(400).send({
                message: "New endDate must not be of length 0"
            });
        }
    }
    if("progress" in req.body){
        if(req.body.progress < 0){
            return res.status(400).send({
                message: "New progress must not be of length 0"
            });
        }
    }

    Borrowed.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then((data) => {
            if(!data) {
                logger.error(`Could not update update entry with id: ${id}.`);
                res.status(404).send({
                    message: `Cannot update borrowed entry with id: ${id}.`
                });

            } else {
                logger.info("Borrowed entry was successfully updated.");
                res.send({
                    message: "Borrowed entry was successfully updated."
                });
            }
        })
        .catch((err) => {
            logger.error(`Could not update borrowed entry with id: ${id}:`, err);
            res.status(500).send({
                message: `Error updating borrowed entry with id: ${id}`
            });
        });
};