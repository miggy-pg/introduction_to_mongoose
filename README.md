# Mongoose

## About

Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. It supports both promises and callbacks, provides schema definition with data validation, and represents the structure of data in MongoDB collections.

## Mongoose Schema Example

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  email: String,
});
```
