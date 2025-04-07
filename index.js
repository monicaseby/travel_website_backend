require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router');
require('./connection');
const path = require('path');

const travelServer = express();

const corsOptions = {
    origin: 'https://travel-website-frontend-five.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

travelServer.use(cors(corsOptions));
travelServer.use(express.json());
travelServer.use(router);

travelServer.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 4000;

travelServer.listen(PORT, () => {
    console.log(`Server is running successfully at PORT ${PORT}`);
});

travelServer.get('/', (req, res) => {
    res.send('Get request received');
});

travelServer.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
