'use strict';

const express = require('express');
const router = express.Router();

const cartItemService = require('./cartItemService.js');


// GET /cartitem/
router.route('/')
    .get(async (req, res, next) => {
        try {
            
        } catch (e) {
            next(e);
        }
    })

// POST /cartitem/ (create a new cart item)
    .post(async (req, res, next) => {
        const { body } = req;
        try {
            const cartItem = await cartItemService.createCartItem(body);
            res.status(201).json({ data: [cartItem] });
        } catch (e) {
            next(e);
        }
    })