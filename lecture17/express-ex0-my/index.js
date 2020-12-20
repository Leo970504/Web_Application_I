'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));

app.use(express.static('./public'));

app.use(express.json());

const dogsList = [
    { id: 3, name: "Worf"},
    { id: 5, name: "Daisy"},
];

app.get('/dogs', (req, res) => {
    res.json(dogsList);
});

app.get('/dogs/:dogId', (req, res) => {
    const dogId = req.params.dogId;
    const theDog = dogsList.filter((dog) => (dog.id == dogId));
    if (theDog.length == 1) {
        res.json(theDog[0]);
    } else {
        res.status(400).json({reason: 'dog not found'});
    }
});

app.post('/dogs', (req, res) => {
    const dog = req.body;
    console.log(dog);
    if (dog.id && dog.name) {
        dogsList.push(dog);
        res.end();
    } else {
        res.status(400).json({reason: "insufficient information"});
    }
});

app.get('/login', (req, res) => {
    const user = req.query.user || 'Unknown';
    const pass = req.query.pass || 'Unknown';

    res.send(`Login by ${user} with password ${pass}`);
});

app.listen(3000, () => {
    console.log('Application started');
});