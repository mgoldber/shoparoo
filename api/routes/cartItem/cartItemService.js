'use strict';

const { model: CartItem } = require('./cartItemModel');

exports.createCartItem = async (cartItemData) => {
    try {
        const cartItem = new CartItem(cartItemData);
        return await cartItem.save();
    } catch (e) {
        throw e;
    }
}