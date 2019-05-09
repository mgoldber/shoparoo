'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fannySchema = new Schema({
    name: String,
    photoUrl: String,
    designer: String
});

module.exports = mongoose.model('Fanny', fannySchema);