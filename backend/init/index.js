const mongoose=require("mongoose");
const mongo_url='mongodb://127.0.0.1:27017/mikblogs'; 
const Blog=require("../models/blog.js");
main()
.then(async ()=>{
    console.log("connected to DB")


})
.catch(()=>{
    console.log("error");

});
async function main(){
    await mongoose.connect(mongo_url);

}



