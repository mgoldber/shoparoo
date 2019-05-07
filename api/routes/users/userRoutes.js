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

router.route('/login')
    .post(async (req, res, next) => {
        try {
            const user = await userService.isUser(req.body);
            if (user) {
                const token = await tokenService.issueToken(user);
                res.status(200).json({
                    data: [{
                        token
                    }]
                })
                logRequest(req, res);
            } else {
                next()
            }
        } catch (e) {
            next(e);
        }
    })

exports.router = router;