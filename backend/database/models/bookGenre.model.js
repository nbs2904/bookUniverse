const mongoose = require("mongoose");
const { Schema } = mongoose;
const {ObjectId} = Schema.Types;

const bookGenreSchema = new Schema({
    bookId:{
        type: ObjectId,
        required: [true, "Book Id method Id must not be empty."]
    },
    genreId: {
        type: ObjectId,
        required: [true, "Genre Id model Id must not be empty."]
    }
});

const bookGenre = mongoose.model("BookGenre", bookGenreSchema);

module.exports = bookGenre;