const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: 'Forbidden', success: false })
    }

    try {
        const payload = jwt.verify(token.split(' ')[1], process.env.JWT_TOKEN_SECRET)
        
        User.findOne({ _id: payload._id }, (err, user) => {
            if (err) {
                return res.status(400).json({ message: 'Error at verifyAuth.js', success: false })
            }
            if (user) {
                req.user = user;
                next();
            }
            else {
                return res.status(400).json({ message: 'User not found', success: false })
            }
        });

    } catch (error) {
        // res.status(401).json({ message: 'Invalid token', success: false })
        next(error)
    }
}

exports.admin = (req, res, next) => {
    try {
        const user = req.user;
        console.log(user)
        if (user.role.toUpperCase() === 'ADMIN') {
            next();
        }
        else {
            return res.status(403).json('Forbidden')
        }
    } catch (error) {
        next(error)
    }
}

// exports.owner = (req, res, next) => {
//     try {
//         const user = req.user;
//         const id = req.params.id;
//         if (user._id == id) {
//             next();
//         }
//         else {
//             return res.status(403).json('Forbidden')
//         }
//     } catch (error) {
//         next(error)
//     }
// }