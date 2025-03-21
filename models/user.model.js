const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true,"Please enter aand email address"],
        unique: true,
        lowercase: true,
        validate:[isEmail,"Please enter a valid email address"]
    },
    password:{
        type: String,
        required: [true,"Please enter a valid password"],
        minlength:[6,"minum password length is 6 characters"]
    }

})
//Hashin the pass word before we save it in our database

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('user', userSchema );
module.exports = User;