'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { schema: reviewSchema } = require('../review/reviewModel.js');

const fannySchema = new Schema({
    name: String,
    photoUrl: String,
    reviews: [reviewSchema]
});

module.exports = mongoose.model('Fanny', fannySchema);