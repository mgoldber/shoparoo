const tokenService = require('../utils/tokenService');
const { HTTP401Error } = require('../utils/httpErrors');

module.exports = async (req, res, next) => {
    const authHeader = req.body.headers['Authorization'];
    if (!authHeader) {
        next(new Error('invalid request'));
    } else {
        try {
            const [prefix, token] = authHeader.split(' ');
            console.log(token);
            const decoded = await tokenService.verifyToken(token);
            console.log(decoded);
            if (decoded) {
                req.token = decoded;
                next()
            } else {
                next(new HTTP401Error());
            }
        } catch (e) {
            console.error(e);
        }
    }
}