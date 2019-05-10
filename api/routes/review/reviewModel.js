'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    name: String,
    review: String
});

module.exports = mongoose.model('Review', reviewSchema);