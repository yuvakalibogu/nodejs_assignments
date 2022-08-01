const mongoose=require("mongoose")

var userschema=new mongoose.Schema({
  name: String,
  email: String,
  number: Number,
  address: String
}); 
module.exports= mongoose.model("User",userschema);