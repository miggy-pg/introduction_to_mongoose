const launches = require("../models/launches.model");

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  const aborted = await launches.abortLaunchById(launchId);
  if (!aborted) {
    return res.status(400).json({ error: "Launch not found" });
  }
  return res.status(200).json(aborted);
}