const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true, // Corrected spelling from "lowecase" to "lowercase"
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter the password'],
    },
});

//fire a function after a doc saved to db
// userSchema.post('save', function(doc, next) {
//     console.log('new user was created & saved');
//     next();
// });

userSchema.pre('save' , async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
};


const User = mongoose.model('User', userSchema); // Changed model name to 'User' (capitalized)
module.exports = User;
