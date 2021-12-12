const request = require('request');

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWVvbWFuOTkiLCJhIjoiY2t3cmI1Z2RyMDdnODJ2c2U1b2dmM2NoMSJ9.19gHmKy5O2v5meRoHNQ4ag&limit=1';

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to geocoding service!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find coordinate of the place!', undefined);
        } else {
            const {center, place_name} = body.features[0];

            callback(undefined, {
                latitude: center[1],
                longtitude: center[0],
                location: place_name
            });
        }
    });
};

module.exports = geocode;