const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password should be at least 6 characters long'],
        select: false
    },
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        minlength: [2, 'First Name should be at least 2 characters long'],
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
        minlength: [2, 'Last Name should be at least 2 characters long']
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
        uppercase: true,
    }
}, { timestamps: true })


// custom middlewares
UserSchema.pre('save', async function (next) {
    const user = this;
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt)
    
    user.password = hashedPassword;
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;