const request = require("request");
const address = process.argv[2];
const geoCode = (address, callback) => {
  const url2 =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    "s.json?access_token=pk.eyJ1Ijoicml0ZXNoa2hhbmRlbHdhbCIsImEiOiJja2Eza240ZnMwazI4M21tc21ub3Nicm1wIn0.IRShlObHaNIFcOXYZkm2PA&limit=1";
  request({ url: url2, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to the server");
    } else if (response.body.features.length === 0) {
      callback("please enter a different result");
    } else {
      callback(undefined, {
        long: response.body.features[0].center[0],
        lat: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

const weatherReport = (long, lat, callback) => {
  const url =
    "http://api.weatherstack.com//current?access_key=8ee3b3a2f37c52fe67610d42d12b97fd&query=" +
    long +
    "," +
    lat;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to the server");
    } else if (response.body.error) {
      callback("please enter a different result");
    } else {
      callback(
        undefined,
        "It is currently " +
          response.body.current.temperature +
          " degrees out and it feels like " +
          response.body.current.feelslike +
          " degree outside."
      );
    }
  });
};

module.exports = {
  weatherReport: weatherReport,
  geoCode: geoCode,
};
