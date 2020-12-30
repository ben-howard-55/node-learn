const express = require('express');

// entry to server
const app = express();

// for entry on domain
app.get('', (req, res) => {
    res.send('<h1>Welcome</h1>'); // html
})

// for entering a sub page, called help
app.get('/help', (req, res) => {
    res.send({ // JSON
        name: 'Ben',
        age: '20'
    });
})

// about route
app.get('/about', (req, res) => {
    res.send('About Page');
})

// weather route
app.get('/weather', (req, res) => {
    res.send({
        forecast: 'raining',
        location: 'auckland'
    });
})

// start the server
app.listen(3000, () => {
    console.log('server is up on port 3000');
});