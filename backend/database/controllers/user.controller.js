const path = require("path");
const reqPath = path.join(__dirname, "../models/user.model");

// logger
const { logger } = require("../../config/logger");

const User = require(reqPath);

// TODO JsDoc
exports.create = (req, res) => {
    // validate request
    if(!req.body?.name || !req.body?.email || !req.body?.pswd || !req.body?.userName || !req.body?.dateOfBirth || !req.body?.paymentMethodId || !req.body?.country || !req.body?.subModelId){
        logger.error("At least one required element is empty:");
        logger.error(`Name: ${req.body?.name}, Email: ${req.body?.email}, PSWD: ${req.body?.pswd}, UserName: ${req.body?.userName}, DateOfBirth: ${req.body?.dateOfBirth}, PayMentMethodID: ${req.body?.paymentMethodId}, Country: ${req.body?.country}, SubModelID: ${req.body?.subModelId}`);
        res.status(400).send({message: "Name, Email, PSWD, UserName, DateOfBirth, PaymentmethodID, Country and SubModelID must not be empty!"});
        return;
    }

    // Create User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        pswd: req.body.pswd,
        userName: req.body.userName,
        dateOfBirth: req.body.dateOfBirth,
        paymentMethodId: req.body.paymentMethodId,
        country: req.body.country,
        subModelId: req.body.subModelId
    });

    // Save User in the database
    user.save(user)
        .then((data) => {
            logger.info("User was created.");
            res.status(201).send(data);
        })
        .catch((err) => {
            logger.error("Some error occurred while creating the User:", err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then((data) => {
            if(!data) {
                logger.error("User could not be found.");
                res.status(404).send({message: `User with id ${id} could not be found.`});
            } else {
                logger.info("User was found.");
                res.status(200).send(data);
            }
        })
        .catch(((err) => {
            logger.error("Request failed:", err);
            res.status(500).send({message: "Something went wrong with retrieving the user."});
        }));
};

exports.update = (req, res) => {
    if(!req.body) {
        logger.error("Data to update was empty:", req.body);
        return res.status(400).send({
            message:"Data to update must not be empty."
        });
    }

    const id = req.params.id;

    if("name" in req.body){
        if(req.body.name.length < 1){
            return res.status(400).send({
                message: "New name must not be of length 0"
            });
        }
    }

    if("email" in req.body){
        if(req.body.email.length < 1){
            return res.status(400).send({
                message: "New email must not be of length 0"
            });
        }
    }

    if("pswd" in req.body){
        if(req.body.pswd.length < 1){
            return res.status(400).send({
                message: "New pswd must not be of length 0"
            });
        }
    }

    if("username" in req.body){
        if(req.body.username.length < 1){
            return res.status(400).send({
                message: "New username must not be of length 0"
            });
        }
    }

    if("dateOfBirth" in req.body){
        if(req.body.dateOfBirth.length < 1){
            return res.status(400).send({
                message: "Date of Birth must not be of length 0"
            });
        }
    }

    if("country" in req.body){
        if(req.body.country.length < 1){
            return res.status(400).send({
                message: "New country must not be of length 0"
            });
        }
    }

    User.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then((data) => {
            if(!data) {
                logger.error(`Could not update update entry with id: ${id}.`);
                res.status(404).send({
                    message: `Cannot update user entry with id: ${id}.`
                });

            } else {
                logger.info("User entry was successfully updated.");
                res.send({
                    message: "User entry was successfully updated."
                });
            }
        })
        .catch((err) => {
            logger.error(`Could not update user entry with id: ${id}:`, err);
            res.status(500).send({
                message: `Error updating user entry with id: ${id}`
            });
        });
};