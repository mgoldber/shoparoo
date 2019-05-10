'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { schema: cartItemSchema } = require('./cartItem/cartItemModel.js');

const cartSchema = new Schema({
    cartItems: [cartItemSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    total: Number,
    subTotal: Number 
});

module.exports = mongoose.model('Cart', cartSchema);