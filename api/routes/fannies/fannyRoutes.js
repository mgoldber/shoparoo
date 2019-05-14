'use strict';

const express = require('express');
const router = express.Router();

const fannyService = require('./fannyService');

const requireAuth = require('../../middleware/auth')

// GET /fannies/
router.route('/')
    .get(async (req, res, next) => {
        try {
            const fannies = await fannyService.listFannies();
            res.status(200).send({
                data: fannies
            });

        } catch (e) {
            next(e);
        }
    });

router.route('/:id')
    .get(async (req, res, next) => {
        try {
            const fanny = await fannyService.getFannyById(req.params.id);
            res.status(200).send({
                data: fanny
            });
        } catch (e) {
            next(e);
        }
    });

router.route('/purchase')
    .post(async (req, res, next) => {
        try {
            for (let pack in req.body) {
                console.log(pack);
            }
            console.log(req.body);
            console.log(req.data);
        } catch (e) {
            next(e);
        }
    });

exports.router = router;