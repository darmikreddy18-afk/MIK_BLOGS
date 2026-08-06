if(process.env.NODE_ENV!="production"){
require("dotenv").config();
}

const express=require("express");
const cors = require("cors");
const app=express();
const path = require("path");
const mongoose=require("mongoose");
const port = process.env.PORT || 8080;
// const Mongo_url='mongodb://127.0.0.1:27017/mikblogs'; 
const dburl=process.env.ATLASDB_URL
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const session=require("express-session"); 
const methodOverride=require("method-override");
const Blog=require("./models/blog.js");
const multer = require("multer");
const { storage } = require("./cloudConfig");

const upload = multer({ storage });
const Comment=require("./models/comments.js")
const {isLoggedIn,isAuthor}=require("./middleware.js");

main()
.then(()=>{
    console.log(process.env.ATLASDB_URL);
    console.log("connected to DB")

})
.catch((err)=>{
   console.log("Database connection error:", err);

});
async function main(){
    await mongoose.connect(dburl);

}
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
}
};
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(session(sessionOptions));
app.use(passport.initialize()) ;
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.post("/signup", async (req, res) => {
    try {
        let { username, email, password } = req.body;

        const newUser = new User({
            username,
            email
        });

        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return res.status(500).send("Login failed");
            }

            res.send("User registered successfully");
        });

    } catch (err) {
        res.status(400).send(err.message);
    }
});
app.post(
    "/login",
    passport.authenticate("local"),
    (req, res) => {
        res.send("Login successful");
    }
);

app.get("/me",(req,res)=>
{
if(!req.user){
    return res.status(401).json(null)
}
res.json(req.user);

})  
app.get("/blogs",async(req,res)=>{
        let blogs= await Blog.find().populate("author").populate("comment");
        res.json(blogs);
    })

app.post(
    "/blogs",
    isLoggedIn,
    upload.single("image"),
    async (req, res) => {
        try {

            const { title, category, content } = req.body;

            const newBlog = new Blog({
                title,
                category,
                content,
                author: req.user._id

            });
           

            if (req.file) {
                newBlog.image = {
    url: req.file.path,
    filename: req.file.filename
};
            }

            await newBlog.save();

            res.status(201).json(newBlog);

        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: err.message
            });
        }
    }
);
app.get("/blogs/:id",async(req,res)=>{
    let {id}=req.params
    let blog=await Blog.findById(id).populate("author","username");
    res.json(blog);
})
app.patch(
    "/blogs/:id/edit",
    isLoggedIn,
    upload.single("image"),
    isAuthor,
    async (req, res) => {

        try {

            const { id } = req.params;

            const blog = await Blog.findById(id);

            if (!blog) {
                return res.status(404).json({
                    message: "Blog not found"
                });
            }


            blog.title = req.body.title;
            blog.category = req.body.category;
            blog.content = req.body.content;


            // if new image uploaded
            if (req.file) {

               blog.image = {
    url: req.file.path,
    filename: req.file.filename
};

            }


            // if no new image, keep old one
            else if (req.body.oldImage) {

                blog.image = JSON.parse(req.body.oldImage);

            }


            await blog.save();


            res.json(blog);


        } catch (err) {

            console.log(err);

            res.status(400).json({
                message: err.message
            });

        }

    }
);
app.delete("/blogs/:id/delete",isLoggedIn,isAuthor, async (req, res) => {
    try {
        const { id } = req.params;

        await Blog.findByIdAndDelete(id);

        res.status(200).json({
            message: "Blog deleted successfully"
        });

    } catch (e) {
        res.status(400).send(e.message);
    }
});
app.get("/blogs/:id/comments", async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id).populate({
            path: "comment",
            populate: {
                path: "author"
            }
        });

        res.json(blog.comment);

    } catch (e) {
        res.status(400).send(e.message);
    }
});
app.post("/blogs/:id/comments",isLoggedIn, async (req, res) => {
    try {
        const { content } = req.body;

        const comment = new Comment({
            content,
            author: req.user._id
        });

        await comment.save();

        const blog = await Blog.findById(req.params.id);

        blog.comment.push(comment._id);

        await blog.save();

        res.status(201).json(comment);

    } catch (e) {
        res.status(400).send(e.message);
    }
});
app.patch("/comments/:id",isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const comment = await Comment.findByIdAndUpdate(
            id,
            { content },
            { new: true }
        );

        res.json(comment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

   app.delete("/comments/:id/delete",isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;

        await Comment.findByIdAndDelete(id);

        await Blog.updateOne(
            { comment: id },
            {
                $pull: {
                    comment: id
                }
            }
        );

        res.json({ message: "Comment deleted" });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
app.get("/users/:id", async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);

    const blogs = await Blog.find({ author: id });
    const comments=await Comment.find({author: id})

    res.json({
        user,   
        blogs,
        comments
    });
});
app.get("/search", async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.json([]);
    }

    const blogs = await Blog.find({
        title: {
            $regex: query,
            $options: "i"
        }
    })
    .select("title")
    .limit(5);

    res.json(blogs);
});
app.post("/save/:id",isLoggedIn, async (req, res) => {
    console.log("SAVE ROUTE HIT");

    const { id } = req.params;

    const user = await User.findById(req.user._id);

    const alreadySaved = user.library.some(
        blogId => blogId.toString() === id
    );

    if (alreadySaved) {
        return res.json({
            message: "Blog already saved"
        });
    }

    user.library.push(id);
    await user.save();

    res.json({
        message: "Blog saved successfully"
    });
});
app.get("/library", async (req, res) => {

    const user = await User.findById(req.user._id)
        .populate("library");

    res.json(user.library);

});
app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.clearCookie("connect.sid");

            res.json({
                message: "Logout successful"
            });
        });
    });
});
app.post("/blogs/:id/like",isLoggedIn,async(req,res)=>{
    const{id}=req.params;
    const blog=await Blog.findById(id);
   
    if (!blog.likes.includes(req.user._id)) {
        blog.likes.push(req.user._id);
        await blog.save();
    }

    res.json({
        likes: blog.likes.length
    });
})
app.listen(port,()=>{
    console.log("app is listening");
});


