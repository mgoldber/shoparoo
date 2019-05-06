const express = require('express');
const router = express.Router();

const userService = require('./userService');
const tokenService = require('../../utils/tokenService');

router.route('/')
    .post(async (req, res, next) => {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json({
                data: [user]
            });
            logRequest(req, res);
        } catch (e) {
            next(e);
        }
    })

exports.router = router;