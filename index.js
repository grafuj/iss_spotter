// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

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

fetchISSFlyOverTimes({latitude:"49.248091",longitude:"-122.9805104"},(error, response) => {
  if (error) {
    console.log("Error encountered:", error);
    return;
  }
  console.log("It worked! Response:", response)

})


