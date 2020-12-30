const express = require('express');
const path = require('path');

// dirname and filename variables:
console.log(__dirname);
console.log(__filename);

// entry to server
const app = express();

// use path.join() to create a longer path to the index
let public = path.join(__dirname, '../public')

// allow express to access files in folder
app.use(express.static(public))

// about route
app.get('/about', (req, res) => {
    res.send('<h1>About</h1>'); //inline html
})

// weather route
app.get('/weather', (req, res) => {
    res.send({ // send JSON
        forecast: 'raining',
        location: 'auckland'
    });
})

// start the server
app.listen(3000, () => {
    console.log('server is up on port 3000');
});