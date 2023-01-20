const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  const url = "https://api.ipify.org/?format=json";
  request(url, (error, response, body) => {
    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      // console.error('error:', error);
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    // console.log(data);
    if (data === undefined) {
      callback("That's not an IP!");
      return;
    }
    callback(null, data.ip); //its in an array and we want property description
    return;
  });
};

const fetchCoordsByIP = (callback) => {
  const url = "http://ipwho.is/" + ip;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const data = JSON.parse(body);
    // if non-200 status, assume server error
    if (data.success === false) {
      const msg = `Success Code: ${data.success} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (data === undefined) {
      callback("That's not an IP!");
      return;
    }
    console.log(data);
    let myCoords = {};
    myCoords.latitude = data.latitude;
    myCoords.longitude = data.longitude;


    callback(null, myCoords);
    return;
  });

};
//example return: { latitude: '49.27670', longitude: '-123.13000' }

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = (coords, callback) => {
  const url = "https://iss-flyover.herokuapp.com/json/?lat=" + coords.latitude + "&lon=" + coords.longitude;
  // console.log(url)
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // console.log(body);
    const data = JSON.parse(body);
    if (data.message !== "success") {
      const msg = `Error Code: ${data.message} when fetching flyovers. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (data === undefined) {
      callback("Those aren't coords");
      return;
    }
    // console.log(data);
   
    callback(null, data.response);
    return;
  });
};



/* https://iss-flyover.herokuapp.com/json/?lat=49.2488091&lon=-122.9805104
{"message":"success","request":{"datetime":1674173680,"latitude":49.2488091,"longitude":-122.9805104,"altitude":1,"number":5},"response":[{"risetime":1674243936,"duration":548},{"risetime":1674280336,"duration":194},{"risetime":1674316736,"duration":466},{"risetime":1674353136,"duration":350},{"risetime":1674389536,"duration":554}]}
*/
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };