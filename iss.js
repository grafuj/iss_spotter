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
  //

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


    // console.log(typeof data) //string, object after parsing
    // console.log(data);
    callback(null, data.ip); //its in an array and we want property description
    return;
  });
};

//
//get {"ip":"206.108.23.158"}
// from https://api.ipify.org/?format=json
module.exports = { fetchMyIP };