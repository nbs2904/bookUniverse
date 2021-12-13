const mongoose = require("mongoose");
const { Schema } = mongoose;
const {ObjectId} = Schema.Types;


const borrowedSchema = new Schema({
    bookId:{
        type: ObjectId,
        required: [true, "Book Id must not be empty."]
    },
    userId: {
        type: ObjectId,
        required: [true, "User Id must not be empty."]
    },
    startDate: {
        type: Date,
        required: [true, "Start date must not be empty."]
    },
    endDate: {
        type: Date,
        required: [true, "Start date must not be empty."]
    },
    progress: {
        type: Object,
        required: [true, "Progress must not be emty."]
    }
});

const borrowed = mongoose.model("Borrowed", borrowedSchema);

module.exports = borrowed;