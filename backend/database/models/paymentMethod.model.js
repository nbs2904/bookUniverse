const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentMethodSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name must not be empty."]
    }
});

const paymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);

module.exports = paymentMethod;