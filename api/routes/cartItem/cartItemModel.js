'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    fannies: [fannySchema],
    quantity: Number
});

module.exports = mongoose.model('Cart', cartSchema);