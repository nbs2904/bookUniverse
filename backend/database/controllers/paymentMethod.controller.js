const path = require("path");
const reqPath = path.join(__dirname, "../models/paymentMethod.model");

// logger
const { logger } = require("../../config/logger");

const PaymentMethod = require(reqPath);

/**
 * function to create a new payment Method (only used in development stage)
 * @param {object} req - request body
 * @param {object} res - response which is sent back to server
 * @returns array of paymentMethods objects
 */
exports.create = (req, res) => {
    // validate request
    if(!req.body?.name){
        logger.error("Name must not be empty.");
        res.status(400).send({message: "Name must not be empty!"});
        return;
    }

    // Create PaymentMethod
    const paymentMethod = new PaymentMethod({
        name: req.body.name
    });

    // Save PaymentMethod in the database
    paymentMethod.save(paymentMethod)
        .then((data) => {
            logger.info("PaymentMethod was created.");
            res.status(201).send(data);
        })
        .catch((err) => {
            logger.error("Some error occurred while creating the PaymentMethod:", err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating the PaymentMethod."
            });
        });
};

/**
 * retrieves one payment Method from database, finds it by id
 * @param {object} req - request body
 * @param {object} res - response body
 * @returns paymentMethod object
 */
exports.findById = (req, res) => {
    const id = req.params.id;

    PaymentMethod.findById(id)
        .then((data) => {
            if(data?.length === 0 || data === null) {
                logger.warn("PaymentMethod could not be found.");
                res.status(404).send({message: `PaymentMethod with id ${id} could not be found.`});
            } else {
                logger.info("PaymentMethod was found.");
                res.status(200).send(data);
            }
        })
        .catch(((err) => {
            logger.error("Request failed:", err);
            res.status(500).send({message: "Something went wrong with retrieving the paymentMethod."});
        }));
};
/**
 * function to get retrieve every payment Method from database
 * @param {object} req - request body
 * @param {object} res - response which is sent back to server
 * @return array of paymentMethod objects
 */
exports.findAll = (req, res) => {
    PaymentMethod.find({}, (err, paymentMethods) => {
        if(err){
            logger.error("Some error occurred while getting all PaymentMethods.", err);
            res.status(500).send({
                message: err.message || "Some error occured while getting all paymentMethods."
            });
        } else {            
            logger.info("All paymentMethods were received.");
            res.status(200).send(paymentMethods);
        }
    });
};