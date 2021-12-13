const mongoose = require("mongoose");
const { Schema } = mongoose;


const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title must not be empty"],
    },
    subtitle: String,
    pageCount: Number,
    ISBN13: {
        type:  Number,
        required: [true, "ISBN must not be empty"],
        minlength: 13,
        maxlength: 13,
    },
    coverUrl: String,
    authors:{ 
        type: Array,
        required: [true, "Author must not be empty"],
    },
    language: String,
    description: String
});

const book = mongoose.model("Book", bookSchema);

module.exports = book;