const mongoose = require('mongoose');



const query_Schema = new mongoose.Schema({

  Query_Id: { type: Number, unique: true },

  category: {
    type: String,
    default: "Class Related",
  },

  title: {
    type: String,
    required: true,
    minlength: 10,
  },
  description: {
    type: String,
    minlength: 10,
    required: true,
  },
  solution: {
    type: String,
    minlength: 10,
    date: { type: Date, default: Date.now(0) },
  },
  assignedTo: {
    type: String,
    minlength: 5,
    require: true,
  },
  status: {
    type: String,
    default: "bending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});




const userSchema = new mongoose.Schema({
    firstName:{
        type : String,
        required : true,
        trim : true,
        maxlength : 22
    },
    lastName:{
        type : String,
        required : true,
        trim : true,
        maxlength : 22
    },
    email:{
        type: String,
        trim : true,
        required : true,
        unique:32
    },
    phoneNumber:{
         type: String,
         minlength:9,
         maxlength:15,
         require:true,
         unique:true
    },
    hashed_password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"student"
    },
    student_query:[query_Schema],

    

});


module.exports = mongoose.model("User", userSchema)





