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
