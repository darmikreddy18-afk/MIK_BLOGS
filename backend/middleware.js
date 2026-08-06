const Blog=require("./models/blog.js");
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            message: "You must be logged in."
        });
    }

    next();
};
module.exports.isAuthor=async(req,res,next)=>{
    const blog=await Blog.findById(req.params.id);
    if (!blog.author.equals(req.user._id)) {
        return res.status(403).json({
            message: "You are not authorized."
        });
    }
    next();




};