const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shinta Bella'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shinta Bella'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Shinta Bella',
        helpText: 'This is some helpful text.'
    });
});

app.get('/weather', (req, res) => {
    
    const address = req.query.address;

    if (!address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }

    geocode(address, (error, { latitude, longtitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longtitude, (error, forecast) => {
                if (error) {
                    return res.send({
                        error
                    });   
                }

                res.send({
                    forecast,
                    location,
                    address
                });
        });
    });
});

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shinta Bella',
        errorMessage: 'Help article not found.'
    });
});

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shinta Bella',
        errorMessage: 'Page not found.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});