const request = require('request');

const forecast = (latitude, longtitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=837d9aa310b7bd097e5b9ea91404c2ea&query='+ latitude + ',' + longtitude +'&units=f';

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const { weather_descriptions, temperature, feelslike } = body.current;

            callback(undefined, weather_descriptions[0] + '. It is currently ' + temperature + ' degress out. It feels like ' + feelslike + ' degress out.');
        }
    });
}

module.exports = forecast;