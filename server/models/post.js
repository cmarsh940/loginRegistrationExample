let mongoose = require('mongoose');
//-.-. .- -- . .-. --- -. / -- .- .-. ... .... .- .-.. .-..//
let PostSchema = new mongoose.Schema({
    post:{
        type: String,
        required: [true, "Post cannot be blank"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],

},{ timestamps: true})
//-.-. .- -- . .-. --- -. / -- .- .-. ... .... .- .-.. .-..//
module.exports = mongoose.model('Post', PostSchema);