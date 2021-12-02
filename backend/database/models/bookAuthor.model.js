const mongoose = require("mongoose");
const { Schema } = mongoose;
const {ObjectId} = Schema.Types;


const bookAuthorSchema = new Schema({
    authorId:{
        type: ObjectId,
        required: [true, "Author Id must not be empty."]
    },
    bookId: {
        type: ObjectId,
        required: [true, "Book Id must not be empty."]
    },
});

const bookAuthor = mongoose.model("BookAuthor", bookAuthorSchema);

module.exports = bookAuthor;