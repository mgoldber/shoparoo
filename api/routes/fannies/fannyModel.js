'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fannySchema = new Schema({
    name: String,
    photoUrl: String,
    price: Number,
    quantity: Number
});

module.exports = mongoose.model('Fanny', fannySchema);