let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let UserSchema = new mongoose.Schema({
    // first_name - regex, required
    first_name: {
        type: String,
        required: [true, "First name cannot be empty"],
        trim: true,
        validate: {
            validator: function(name){
                return /^[a-zA-Z]+$/.test(name);
            },
            message: "First name cannot contain numbers or symbols."
        }
    },
    // last_name - regex, required
    last_name: {
        type: String,
        required: [true, "Last name cannot be empty"],
        trim: true,
        validate: {
        validator: function(name){
            return /^[a-zA-Z]+$/.test(name);
        },
        message: "Last name cannot contain numbers or symbols."
        }
    },
    //-.-. .- -- . .-. --- -. / -- .- .-. ... .... .- .-.. .-..//
    // birthday - required, at least 16 year old
    birthday: {
        type: Date,
        required: [true, "Birthday cannot be empty"],
        trim: true,
        validate: {
            // birthday validator for age resrictions (i.e 16)
            validator: function( birthday ) {
                return ((Date.now() - (24*3600*1000*365*16))> birthday.getTime()); //x*16 determines the year.
            },
            message: "You must be at least 16 years of age to register!"
        }  
    },
    email: {
        type: String,
        required: [true, "Must enter an email!"],
        trim: true,
        unique: true,
        validate: {
            validator: function(email){
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
            },
            message: "Please enter your email in the correct format."
        }
    },
    // password - regex, required, min 8, max 32, match confirm
    password: {
        type: String,
        required: [true, "Password field cannot be empty"],
        minlength: [8, "Password must be at least 8 characters"],
        maxlength: [32, "Password cannot be greater then 32 characters"],
        validate: {
            validator: function( value ) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
            },
            message: "Password must have at least 1 number, and 1 uppercase"
        }
        // validate: {
        //     validator: function( value ) {
        //         return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
        //     },
        //     message: "Password must have at least 1 number, 1 uppercase and a special character"
        // }
    },
    //add refferences to user (i.e user has posts and comments)
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
}, {timestamps: true})
//-.-. .- -- . .-. --- -. / -- .- .-. ... .... .- .-.. .-..//
UserSchema.pre('save', function(done){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    done();
})
//-.-. .- -- . .-. --- -. / -- .- .-. ... .... .- .-.. .-..//
module.exports = mongoose.model('User', UserSchema);