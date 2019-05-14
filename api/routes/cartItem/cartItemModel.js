'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    fanny: {
        type: Schema.Types.ObjectId,
        ref: 'Fanny'
    },
    quantity: Number
});

module.exports = mongoose.model('CartItem', cartItemSchema);