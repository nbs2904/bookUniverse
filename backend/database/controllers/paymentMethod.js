const db = require("../models");
const PaymentMethod = db.paymentMethod;

exports.create =(req, res) => {
    // validate request
    if(!req.body.name){
        res.status(400).send({message: "Name must not be empty!"});
        return;
    }

    // Create subModel
    const paymentMethod = new PaymentMethod({
        name: req.body.name
    });

    // Save subModel in the database
    paymentMethod.save(paymentMethod)
        .then((data) => res.send(data))
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the subModel."
            });
        });
};