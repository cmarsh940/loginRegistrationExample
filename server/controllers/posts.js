var mongoose = require('mongoose');
var Post = mongoose.model('Post');
module.exports = {
	post: function(req,res){
		var newPost = new Post({
			type: String,
			required: [true, "Post cannot be empty"],
			minlength: [2, "Post must be at least 2 characters"],
		});
		Post.find({}, function(err, posts){
            if(err){
                console.log(err);
            } else {
                return res.render('main', {posts: posts});
            }
        })
	}
}