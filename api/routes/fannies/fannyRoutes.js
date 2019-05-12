'use strict';

const express = require('express');
const router = express.Router();

const fannyService = require('./fannyService');

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
            console.log(req.query.id);
            const fanny = await fannyService.getFannyById(req.id);
            res.status(200).send({
                data: fanny
            });
        } catch (e) {
            next(e);
        }
    });

exports.router = router;