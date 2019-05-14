const tokenService = require('../utils/tokenService');

module.exports = async (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        next(new Error('invalid request'));
    } else {
        const [prefix, token] = authHeader.split(' ');
        try {
            const decoded = tokenService.verifyToken(token);
            req.token = decoded;
            next()
        } catch (e) {
            console.error(e);
        }
    }
}