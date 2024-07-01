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

## An Upsert Example

The first argument to the find method is an object that specifies the criteria for the documents we want to retrieve.
If we pass an empty object, the find method will return all documents in the collection.
The second argument is a projection object that specifies which fields we want to include or exclude from the result set.

```
async function savePlanet(planet) {
  try {
    await planets.updateOne({
      keplerName: planet.keplerName
    }, {
      keplerName: planet.keplerName
    }, {
      upsert: true
    })
  } catch (error) {
    console.error(`Could not save planet ${error}`)
  }
}
```

## How Schema is Structured
```javascript
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

```
