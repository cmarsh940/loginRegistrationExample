var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
module.exports = {
	comment: function(req,res){
		var newComment = new Comment({
			type: String,
			required: [true, "Comment cannot be empty"],
			minlength: [2, "Comment must be at least 2 characters"],
		});
	}
}