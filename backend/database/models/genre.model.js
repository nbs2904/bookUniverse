const mongoose = require("mongoose");
const { Schema } = mongoose;

const genreSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name must not be empty."]
    }
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;