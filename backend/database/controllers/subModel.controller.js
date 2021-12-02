const db = require("../models");
const SubModel = db.subModel;

exports.create =(req, res) => {
    // validate request
    if(!req.body.name){
        res.status(400).send({message: "Name must not be empty!"});
        return;
    }

    // Create subModel
    const subModel = new SubModel({
        name: req.body.name
    });

    // Save subModel in the database
    subModel.save(subModel)
        .then((data) => res.send(data))
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the subModel."
            });
        });
};