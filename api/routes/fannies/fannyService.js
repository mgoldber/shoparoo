'use strict';

const Fanny = require('./fannyModel');

exports.listFannies = async () => {
    try {
        const fannies = await Fanny.find({});
        return fannies;
    } catch (e) {
        throw e;
    }
}

exports.getFannyById = async (fannyId) => {
    try {
        const fanny = await Fanny.findById(fannyId);
        return fanny;
    } catch (e) {
        throw e;
    }
}

exports.calculatePriceTotal = async(fannies) => {
    let costTotal = fannies.map((total) => {
        return total.data.data.price * total.data.data.quantity;
    }).reduce((sum, totalCost) => {
        return sum + totalCost;
    });
    return costTotal;
}