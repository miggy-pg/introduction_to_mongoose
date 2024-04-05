const mongoose = require("mongoose");
const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
    },
    launchDate: {
        type: Date,
        required: true
    },
    mission: {
        type: String,
        required: true
    },
    rocket: {
        type: String,
        required: true
    },
    target: {
        type: String
    },
    customers: [String],
    upcoming: {
        type: Boolean,
        required: true
    },
    success: {
        type: Boolean,
        required: true,
        default: true
    },
})

// The first argument is the singular name of the collection your model represents.
// The second argument is the schema you want to use for the model.
// The third argument is the name of the collection you want to use in the database.
// If you don't provide a collection name, Mongoose will use the pluralized version of the first argument.
// In this case, Mongoose will create a collection called "launches" because the first argument is "Launch". 
// This will convert "Launch" to plural form and smaller text and use that as the collection name.
module.exports = mongoose.model("Launch", launchesSchema);