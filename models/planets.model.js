// This is just a sudo code to show the structure of the file.
// Notice that we have a "model" and "mongo" file for both launches and planets.
// The model file is used to interact with the database.
// The mongo file is used to define the schema and model for the database.

const planets = require("./planets.mongo")
const {parse} = require("csv-parse")
const fs = require("fs")

fs.createReadStream("kepler_data_planetary.csv").pipe(parse({
        column: true,
        comment: "#"
    }))
    .on("data", async(data)=>
    // We will use "upsert" to update the document if it already exists or insert it if it doesn't.     
    //  What happens here is that the first argument is the filter to find the document to update.
    // The second argument is the data to update or insert if the document doesn't exist.
    // The third argument is an object that specifies that we want to insert the document if it doesn't exist by using the "upsert" option.
      savePlanet(data)
    )
    .on("error",  (err)=>
    console.log(err)
    )
    .on("end", async()=>{
      const countPlanetsFound = (await getAllPlanets()).length
        console.log(`Found ${countPlanetsFound} planets in total`)
        console.log("Done")
    })

async function getAllPlanets() {
  // We can learn more about the find method by visiting the Mongoose documentation.
  // The first argument to the find method is an object that specifies the criteria for the documents we want to retrieve.
  // If we pass an empty object, the find method will return all documents in the collection.
  // The second argument is a projection object that specifies which fields we want to include or exclude from the result set.
  return await planets.find({}, { __v: 0, _id: 0 })
}

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

module.exports = {
  getAllPlanets,
}