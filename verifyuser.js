const jwt = require('jsonwebtoken')

const VerifyUser = (req, res, next) => {
    jwt.verify(req.headers.token, process.env.TOKEN_SECRET, (err, payload) => {
        if (err) {
            return res.status(403).json({
                err: true,
                msg: err.message
            })
        }
        next()
    });
};

module.exports = VerifyUser