const path = require("path");
const reqPath = path.join(__dirname, "../models/subModel.model");

// logger
const { logger } = require("../../config/logger");

const SubModel = require(reqPath);

// TODO JsDoc
exports.create = (req, res) => {
    // validate request
    if(!req.body?.name){
        logger.error("Name must not be empty.");
        res.status(400).send({message: "Name must not be empty!"});
        return;
    }

    // Create SubModel
    const subModel = new SubModel({
        name: req.body.name
    });

    // Save SubModel in the database
    subModel.save(subModel)
        .then((data) => {
            logger.info("SubModel was created.");
            res.status(201).send(data);
        })
        .catch((err) => {
            logger.error("Some error occurred while creating the SubModel:", err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating the SubModel."
            });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id;

    SubModel.findById(id)
        .then((data) => {
            if(!data) {
                logger.error("SubModel could not be found.");
                res.status(404).send({message: `SubModel with id ${id} could not be found.`});
            } else {
                logger.info("SubModel was found.");
                res.status(200).send(data);
            }
        })
        .catch(((err) => {
            logger.error("Request failed:", err);
            res.status(500).send({message: "Something went wrong with retrieving the subModel."});
        }));
};

exports.findAll = (req, res) => {
    SubModel.find({}, (err, subModels) => {
        if(err){
            logger.error("Some error occurred while getting all SubModels.", err);
            res.status(500).send({
                message: err.message || "Some error occured while getting all subModels."
            });
        } else {
            let subModelMap = {};
    
            subModels.forEach(subModel => {
                subModelMap[subModel._id] = subModel;
            });
            
            logger.info("All subModels were received.");
            res.status(200).send(subModelMap);
        }
    });
};