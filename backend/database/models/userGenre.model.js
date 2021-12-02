const mongoose = require("mongoose");
const { Schema } = mongoose;
const {ObjectId} = Schema.Types;

const userGenreSchema = new Schema({
    userId:{
        type: ObjectId,
        required: [true, "User Id method Id must not be empty."]
    },
    genreId: {
        type: ObjectId,
        required: [true, "Genre Id model Id must not be empty."]
    }
});

const userGenre = mongoose.model("UserGenre", userGenreSchema);

module.exports = userGenre;