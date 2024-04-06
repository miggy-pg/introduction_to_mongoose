const launchesMongo = require('./launches.mongo');
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
}

// saveLaunch(launch);

async function saveLaunch(launch){
  const planet = await planets.findOne({
    keplerName: launch.target
  })

  // Since we are in our data acces layer and not in our controller, we should throw an error if the planet is not found.
  if (!planet){
    throw new Error('No matching planet found')
  }

  // return await launchesMongo.updateOne   // since 'updateOne' generates unnecessary '$setOnInsert' properies, we will use 'findOneAndUpdate' instead.
  // findOneAndUpdate performs the same operation as updateOne but it will not generate unnecessary '$setOnInsert' properties.
  return await launchesMongo.findOneAndUpdate({
    launchNumber: launch.launchNumber   // will check if the launchNumber already exists & if exists, it will update the launch data (line 6)
  }, launch, {
    upsert: true
  })

  // The upsert option will automatically create $setOnInsert and $setOnUpdate fields in the document when we use the updateOne method.
}

async function getLatestFlightNumber(){
  const latestLaunch = await launchesMongo.findOne().sort('-flightNumber')
  if (!latestLaunch){
    return DEFAULT_FLIGHT_NUMBER
  }
  return latestLaunch.flightNumber
}

async function scheduleNewLaunch(launch){
  const newFlightNumber = await getLatestFlightNumber() + 1
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    flightNumber: newFlightNumber
  })

  await saveLaunch(newLaunch)

}

// The code below are sudo codes that shows how to interact with the database.
function existsLaunchWithId(launchId){
  return launchesMongo.findOne({
    flightNumber: launchId})
}

async function getAllLaunches(skip, limit){
  return await launchesMongo
    .find({}, {
      __v: 0,
      _id: 0
    })
    .sort({flightNumber: 1})
    .skip(skip)
    .limit(limit)
}

async function abortLaunchById(launchId){
  const aborted = await launchesMongo.updateOne({
    flightNumber: launchId
  }, {
    upcoming: false,
    success: false
  })

  return aborted.ok === 1 && aborted.nModified === 1 
}

// So in our controller, this will be handled like this:




module.exports = {
  saveLaunch,
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById
}