const request = require('request-promise-native');

const fetchMyIP = () => {
  // use request to fetch IP address from JSON API
  return request("https://api.ipify.org/?format=json");
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = (body) => {
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

const printPassTimes = (array) => {
  console.log(`Next pass at ${array[0].risetime} (Pacific Daylight Time) for ${array[0].duration} seconds!`);
  console.log(`Next pass at ${array[1].risetime} (Pacific Daylight Time) for ${array[1].duration} seconds!`);
  console.log(`Next pass at ${array[2].risetime} (Pacific Daylight Time) for ${array[2].duration} seconds!`);
  console.log(`Next pass at ${array[3].risetime} (Pacific Daylight Time) for ${array[3].duration} seconds!`);
  console.log(`Next pass at ${array[4].risetime} (Pacific Daylight Time) for ${array[4].duration} seconds!`);
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
  printPassTimes,
};
