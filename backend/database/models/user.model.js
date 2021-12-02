const mongoose = require("mongoose");
const { Schema } = mongoose;
const {ObjectId} = Schema.Types;

const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, "Username must not be empty."],
        minlength: [4, "Username must be longer than 4 character"],
    },
    email: {
        type: String,
        required: [true, "Email must not be empty."]
    },
    pswd: {
        type: String,
        required: [true, "Password must be longer than 4 character"]
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Date of birth must not be empty."]
    },
    paymentMethodId:{
        type: ObjectId,
        required: [true, "Payment method Id must not be empty."]
    },
    country: {
        type: String,
        minLength: [2, "Country must be longer than 4 character"]
    },
    subModelId: {
        type: ObjectId,
        required: [true, "Subscription model Id must not be empty."]
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;