'use strict';

const mongoose = require('mongoose');
const express = require('express');
const http = require('http');

const { URL } = require('./utils/constants');

// Create main express instance
const router = express();

// Require utility function for adding middleware
const { applyMiddleware } = require('./utils');

// Require general middleware
const middleWare = require('./middleware');

// Require routes
const { router: bookRoutes } = require('./routes/books/bookRoutes');

// Require constants
const { PORT } = require('./utils/constants');

// Apply general middleware
applyMiddleware(middleWare, router);

// Utilize routes
router.use('/api/books', bookRoutes);

// Create a server from express instance
const server = http.createServer(router);


mongoose
    .connect(URL, { useNewUrlParser: true })
    .then(async () => {
        console.log(`Connected to database at ${URL}`);
        server.listen(PORT, () => {
            console.log(`Server is running on PORT:${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    })