const mongoose = require("mongoose");
const { Schema } = mongoose;

const subModelSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name must not be empty."]
    }
});

const subModel = mongoose.model("SubModel", subModelSchema);

module.exports = subModel;