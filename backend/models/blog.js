const mongoose=require("mongoose");
const Schema = mongoose.Schema;


const blog_schema=new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"  

    },
    image:{
        url:{
            type: String,
            default:"/images/defimage.jpg"

        },
        filename:String,
         
    
    },
   

    title:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,

    },
     createdAt: {
        type: Date,
        default: Date.now
    },
    comment:[{      
        type:Schema.Types.ObjectId,
        ref:"Comment"
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]


})
module.exports = mongoose.model("Blog",blog_schema);