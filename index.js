// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP((error, coords) => {
//   if (error) {
//     console.log("It didn't work!", error.message);
//     return;
//   }
//   console.log('It worked! Returned coords:', coords);
// });

// fetchISSFlyOverTimes({latitude:"49.248091",longitude:"-122.9805104"},(error, response) => {
//   if (error) {
//     console.log("Error encountered:", error);
//     return;
//   }
//   console.log("It worked! Response:", response);
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(`Next pass at ${passTimes[0].risetime} (Pacific Daylight Time) for ${passTimes[0].duration} seconds!`);
  console.log(`Next pass at ${passTimes[1].risetime} (Pacific Daylight Time) for ${passTimes[1].duration} seconds!`);
  console.log(`Next pass at ${passTimes[2].risetime} (Pacific Daylight Time) for ${passTimes[2].duration} seconds!`);
  console.log(`Next pass at ${passTimes[3].risetime} (Pacific Daylight Time) for ${passTimes[3].duration} seconds!`);
  console.log(`Next pass at ${passTimes[4].risetime} (Pacific Daylight Time) for ${passTimes[4].duration} seconds!`);
});


