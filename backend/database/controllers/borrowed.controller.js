const path = require("path");

const reqPathBorrowed = path.join(__dirname, "../models/borrowed.model");
const reqPathUser = path.join(__dirname, "../models/user.model.js");

// logger
const { logger } = require("../../config/logger");

const Borrowed = require(reqPathBorrowed);
const User = require(reqPathUser);

const { ObjectId } = require("mongoose").Types;


/**
 * creates a new entry in database when user borrows a book
 * @param {object} req - request body
 * @param {object} res - response body, which is sent back to server
 */
exports.create = async (req, res) => {
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
    await borrowed.save(borrowed)
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

/**
 * retrieves every book from database, which is currently borrowed from user with userId
 * @param {object} req - request body
 * @param {object} res - reponse object
 * @returns array of borrowed objects
 */
exports.findByUserId = (req, res) => {
    const userId = ObjectId(req.params.userId);

    User.aggregate([
        {$match: {$expr: {$eq: [userId, "$_id"]}}},
        {$lookup: {
            from: "borroweds",
            as: "borrowed",
            let: {user_id: "$_id"},
            pipeline: [
                {$match: {$and: [
                    {$expr: {$eq: ["$$user_id", "$userId"]}},
                    {startDate: {$lte: new Date()}},
                    {endDate: {$gte: new Date()}}  
                ]}},
                {$lookup: {
                    from: "books",
                    as: "books",
                    let: {borrowed_bookId: "$bookId"},
                    pipeline: [
                        {$match: {$and: [
                            {$expr: {$eq: ["$$borrowed_bookId", "$_id"]}}                      
                        ]}},
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
                    ]
                }},
                {$project: {
                    _id: 0,
                    startDate: "$startDate",
                    endDate: "$endDate",
                    book: {$arrayElemAt: ["$books", 0]}
                }}
            ]
        }},
        {$project: {
            _id: 0,
            borrowed: "$borrowed"
        }}
    ], (err, data) => {
        if(err) {
            logger.error("Request failed:", err);
            res.status(500).send({message: "Something went wrong with retrieving the borrowed entry."});
        } else if(data?.length === 0 || data === null) {
            logger.warn("Borrowed entry could not be found.");
            res.status(404).send({message: `Borrowed entry with id ${userId} could not be found.`});
        } else {
            logger.info("Borrowed entry was found.");
            res.status(200).send(data[0].borrowed);
        }
    });
};

/**
 * updates borrowed entry, if user extends or returns a book early 
 * @param {object} req - request body
 * @param {object} res - reponse object
 */
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
            if(data?.length === 0 || data === null) {
                logger.warn(`Could not update update entry with id: ${id}.`);
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

/**
 * gets id of every book a user has currently borrowed
 * @param {object} req - request body
 * @param {object} res - response object
 * @returns array of strings
 */
exports.borrowedBookIds = (req, res) => {
    const userId = ObjectId(req.params.userId);
    
    User.aggregate([
        {$match: {"_id": userId}},
        {$lookup: {
            from: "borroweds",
            as: "borrowed",
            let: {user_id: "$_id"},
            pipeline: [
                {$match: {$and: [
                    {$expr: {$eq: ["$userId", "$$user_id"]}},
                    {startDate: {$lte: new Date()}},
                    {endDate: {$gte: new Date()}}
                ]}},
                {$project: {
                    _id: 0,
                    bookId: 1
                }}
            ]

        }},
        {$project: {
            _id: 0,
            borrowed: {
                $map: {
                    input: "$borrowed",
                    as: "borrowed",
                    in: "$$borrowed.bookId"
                }
            }
        }}
    ], (err, data) => {
        if(err) {
            logger.error("Request failed:", err);
            res.status(500).send({message: "Something went wrong with retrieving the borrowed book ids."});
        } else if(data?.length === 0 || data === null) {
            logger.warn("No books are currently borrowed");
            res.status(404).send({message: "User has not any books borrowed"});
        } else {
            logger.info("Borrowed book(s) were found.");
            res.status(200).send(data[0].borrowed);
        }
    });
};


/**
 * gets information of a specific book which is currently borrowed, using userId and bookId
 * @param {object} req - request body
 * @param {object} res - response object
 * @returns book object
 */
exports.borrowedBookInfo = (req, res) => {
    const userId = ObjectId(req.params.userId);
    const bookId = ObjectId(req.params.bookId);
    
    Borrowed.aggregate([
        {$match: {$and: [
            {userId: userId},
            {bookId: bookId},
            {startDate: {$lte: new Date()}},
            {endDate: {$gte: new Date()}}
        ]}},
        {$lookup: {
            from: "books",
            as: "books",
            let: {book_id: "$bookId"},
            pipeline: [                
                {$match: {$expr: {$and: [{$eq: ["$_id", "$$book_id"]}]}}},
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
            ]
        }},
        {$project: {
            _id: 1,
            startDate: 1,
            endDate: 1,
            progress: 1,
            book: {$arrayElemAt: ["$books", 0]}
        }}

    ], (err, data) => {
        if(err) {
            logger.error("Request failed:", err);
            res.status(500).send({message: "Something went wrong with retrieving the borrowed book info."});
        } else if(data?.length === 0 || data === null) {
            logger.warn("This book has not been currently borrowed by this user.");
            res.status(404).send({message: "This book has not been currently borrowed by this user."});
        } else {
            logger.info("Borrowed book info was found.");
            res.status(200).send(data[0]);
        }
    });
};

/**
 * gets information of borrowed book using entryId
 * @param {object} req - request body
 * @param {object} res - response object
 * @returns book object
 */
exports.borrowedBookInfoByEntryId = (req, res) => {
    const id = ObjectId(req.params.id);
    
    Borrowed.aggregate([
        {$match: {$and: [
            {_id: id},
            {startDate: {$lte: new Date()}},
            {endDate: {$gte: new Date()}}
        ]}},
        {$lookup: {
            from: "books",
            as: "books",
            let: {book_id: "$bookId"},
            pipeline: [                
                {$match: {$expr: {$and: [{$eq: ["$_id", "$$book_id"]}]}}},
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
            ]
        }},
        {$project: {
            _id: 1,
            startDate: 1,
            endDate: 1,
            progress: 1,
            book: {$arrayElemAt: ["$books", 0]}
        }}

    ], (err, data) => {
        if(err) {
            logger.error("Request failed:", err);
            res.status(500).send({message: "Something went wrong with retrieving the borrowed book info."});
        } else if(data?.length === 0 || data === null) {
            logger.warn("This book has not been currently borrowed by this user.");
            res.status(404).send({message: "This book has not been currently borrowed by this user."});
        } else {
            logger.info("Borrowed book info was found.");
            res.status(200).send(data[0]);
        }
    });
};