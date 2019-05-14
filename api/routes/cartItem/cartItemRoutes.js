'use strict';

const express = require('express');
const router = express.Router();

const CartItem = require('./cartItemModel');

// POST /add/
router.route('/add')
    .post(async (req, res, next) => {
        try {
            const cartItem = new CartItem()
            cartItem.fanny = req.fannyId;
            cartItem.quantity = 1;
            cartItem.save();
        } catch (e) {
            next(e);
        }
    });