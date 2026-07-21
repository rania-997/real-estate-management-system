import mongoose, { Schema } from "mongoose";


const propertySchema=new.Schema({
   title:{
    type:String,
    required:true,
    minlength:3
   } ,
   description:{
       type:String,
    required:true,
    minlength:5
   },
   price:{
    type:Number,
    required:true,
   min:0

   },
   location:{
    type:String,
     required:true,
    minlength:3
   },
   type:{
    type:String,
  enum: ["Apartment", "Villa", "Studio", "Office", "Land"],
  required:true
   },
   purpose:{
    type:String,
    enum: ["Sale", "Rent"],
    required:true
   },
   bathrooms:{
    type:Number,
    default:0
   },
   bedrooms:{
      type:Number,
    default:0
   },
   area:{
    type:Number,
    min:1,
    required:true
   },
   images:{
    type:[String],
    required:true
   },
   owner:{
    type:Schema.ObjectId,
    ref:"User",
    required:true
   },
   isAvailable:{
    type:Boolean,
  default:true
   }
},{timestamps:true});
propertySchema.index({createdAt:-1})


const Property=mongoose.model('Property',propertySchema)
export default Property;