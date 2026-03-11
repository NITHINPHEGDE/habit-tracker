import mongoose from "mongoose"

const habitSchema = new mongoose.Schema(
{
user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},
name:{
type:String,
required:true
},
type:{
type:String,
enum:["bool","quantity"],
default:"bool"
},
target:{
type:Number,
default:1
},
unit:{
type:String,
default:""
},
color:{
type:String
},
logs:{
type:Map,
of:Number
}
},
{timestamps:true}
)

export default mongoose.model("Habit",habitSchema)
