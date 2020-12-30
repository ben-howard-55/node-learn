const axios = require("axios");

// ask for user information until either logged in or signed up
const weatherUrl =
  "http://api.weatherstack.com/current?access_key=<key>&query=<location>";
const GeoLocationUrl = `https://us1.locationiq.com/v1/search.php?key=<key>&q=<location>&format=<format>`;

// basic object for geoData
let geoData = {
  key: "pk.37c20ac620b4ab96f5851e154a494da7",
  query: "",
  format: "json",
};

// basic object for weatherData
let weatherData = {
  key: "6b476a9e41424344bda8f8a777b2414c",
  query: "",
};

/**
 * Request is given a location and that location is transformed
 * into its geo-location coordinates. The coords are then used
 *  to find the weather in the location.
 *
 * @param location - The Location passed by yargs
 */
class Request {
  findCoords(location) {
    geoData.query = location;

    // promise that is returned by geoLocation call.
    let geoPromise = new Promise((fulfill, reject) => {
      let geoUrl =
        "https://us1.locationiq.com/v1/search.php?key=" +
        geoData.key +
        "&q=" +
        geoData.query +
        "&format=" +
        geoData.format;
      axios
        .get(geoUrl)
        .then(
          (fulfilled = (res) => {
            // get first response
            var coord = res.data[0];
            //show request as fulfilled
            fulfill(coord);
          }),
          (rejected = (err) => {
            // reject for api call failure
            reject("Api call Failed" + err);
          })
        )
        .catch((err) => {
          // reject for unable to find location
          reject("couldn't find location:" + err);
        });
    });
    // use the geoPromise to either call weather function or print failure
    geoPromise
      .then(
        ((fulfilled = (coord) => {
          getWeather(coord);
        }),
        (rejected = (err) => {
          console.log("couldn't get weather: " + err);
        }))
      )
      .catch((err) => {
        console.log(err);
      });
  }

  getWeather(coords) {
    // use an axios promise wrapped in promise, p, and use the response to either
    // resolve or reject the request
    weatherData.query = coords.lat + "," + coords.lon;
    let weatherUrl =
      "http://api.weatherstack.com/current?access_key=" +
      weatherData.key +
      "&query=" +
      weatherData.query;

    let p = new Promise((fulfill, reject) => {
      //call url
      axios
        .get(weatherUrl)
        .then(
          (fulfilled = (res) => {
            //show request as fulfilled
            fulfill(res.data);
          }),
          (rejected = (err) => {
            // reject for api call failure
            reject("Api call Failed" + err);
          })
        )
        .catch((err) => {
          // reject for unable to find location
          reject("Couldn't get data due to an error: " + err);
        });
    });

    // From promise p, log the information provided,
    // whether resolved or not
    p.then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log("error " + err);
    });
  }
}

export default new Request();
