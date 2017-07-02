const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs'); //for encryption
const Schema = mongoose.Schema;

let emailLengthChecker = (email) => {
    if (!email) {
        return false;
    } else {
        if (email.length < 5 || email.length > 30) {
            return false;
        } else {
            return true;
        }
    }
};

let validEmailChecker = (email) => {
    if (!email) {
        return false;
    } else {
        const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regex.test(email);
    }
}

let usernameLengthChecker = (username) => {
    if (!username) {
        return false;
    } else {
        if (username.length < 5 || username.length > 15) {
            return false
        } else {
            return true;
        }
    }
};

let validUsername = (username) => {
    if (!username) {
        return false;
    } else {
        const regex = new RegExp(/^[a-zA-Z\-]+$/);
        return regex.test(username);
    }
};

let passwordLengthChecker = (password) => {
    if (!password) {
        return false;
    } else {
        if (password.length < 5 || password.length > 16) {
            return false;
        } else {
            return true;
        }
    }
}

let validPassword= (password)=>{
    if(!password){
        return false;
    }else{
        const regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,16}$/);
        return regex.test(password);
    }
}

const emailValidators = [
    {
        validator: emailLengthChecker,
        message: 'Email must be at least 5 characters and no more than 30 characters'
    },
    {
        validator: validEmailChecker,
        message: 'Must be a valid email'
    }
];

const usernameValidators = [
    {
        validator: usernameLengthChecker,
        message: 'Username must be at least 5 characters and no more than 15'
    },
    {
        validator: validUsername,
        message: 'Please enter a valid username'
    }
];

const passwordValidators = [
    {
        validator: passwordLengthChecker,
        message: 'Password must be at least 5 characters and no more than 16'
    },
    {
        validator: validPassword,
        message: 'Please enter a valid password. At least one uppercase, one lowercase and one number'
    }
];

//user schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: emailValidators
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: usernameValidators
    },
    password: {
        type: String,
        required: true,
        validate: passwordValidators
    }
});

//middleware for encrypting the password before saving
userSchema.pre('save', function (next) {
    //Ensure password is new or modified before applying encryption
    if (!this.isModified('password'))
        return next();
    
    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

//decrypt the password
userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
