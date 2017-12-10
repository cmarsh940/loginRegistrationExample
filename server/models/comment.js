let mongoose = require('mongoose');
//-.-. .- -- . .-. --- -. / -- .- .-. ... .... .- .-.. .-..//
let CommentSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: [true, "Comment cannot be blank"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{ timestamps: true})
//-.-. .- -- . .-. --- -. / -- .- .-. ... .... .- .-.. .-..//
module.exports = mongoose.model('Comment', CommentSchema);