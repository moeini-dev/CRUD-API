const {verify} = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get('authorization');
        if(token) {
            token = token.slice(7);
            // 'qwe1234' is the secret key that should not be hard coded! Using .env file and environment variables are recommended
            const secretKey = process.env.SC_KEY;
            verify(token, secretKey, (err, decoded) => {
                if(err) {
                    res.json({
                        success: 0,
                        message: 'Invalid token'
                    });
                } else {
                    next();
                }
            });
        } else {
            res.json({
                success: 0,
                message: 'Access denied! Unauthorized user'
            });
        }
    }
}