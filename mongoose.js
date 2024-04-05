// Mongoose

// Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
// It is a library that helps you define schemas with strongly typed data. It also provides a way to validate data before saving it into the database.
// The structure of a model is represented as Collection in MongoDB. Each document in a collection is an instance of a model.These are formatted as JSON objects.


// Mongoose Schema
// Mongoose schema is tied to a MongoDB collection and defines the shape of the documents within that collection.
// Example: 
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const userSchema = new Schema({
//   name: String,
//   email: String
// });