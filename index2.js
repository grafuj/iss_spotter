const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
  printPassTimes,
} = require('./iss_promised');

nextISSTimesForMyLocation()
  .then(body => {
    printPassTimes(body);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });



