import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt =await  bcrypt.genSalt(8);
  this.password =await  bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword=async function(enteredPass) {

   return await bcrypt.compare(enteredPass,this.password)
   
 
}        
const User = mongoose.model("User", userSchema);

export default User;
