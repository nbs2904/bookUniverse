const mongoose = require("mongoose");
const { Schema } = mongoose;

const authorSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name must not be empty."]
    }
});

const author = mongoose.model("Author", authorSchema);

module.exports = author;