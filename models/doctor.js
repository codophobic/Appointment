const mongoose= require('mongoose');
const schema = mongoose.Schema;

const doctorSchema = new schema({
    name:{
        type:String,
        required:true
    },
    id:{
        type:Number,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    }
});

module.exports= Doctor = mongoose.model("doctordata",doctorSchema);
