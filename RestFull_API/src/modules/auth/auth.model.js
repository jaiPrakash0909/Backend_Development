import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 50,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "email is required"],
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, "Password is required"],
        minlength: 8,
        select: false
    },
    role: {
        type: string,
        enum: ["customer", "seller", "admin"],
        default: "customer"
    },
    isVarified: {
        type: Boolean,
        default :false
    },
    varificationToken: {type: string, select: false},
    refereshToken: {type: string, select: false}, 
    resetPasswordtoken: {type: string, select: false}, 
    resetpasswordExpires: {type: string, select: false}, 
}, {timestamps: true})


userSchema.pre('save', async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

userSchema.methods.comparePassword = async function(clearTextPassword){
    return bcrypt.compare(clearTextPassword, this.password)
}

export default mongoose.model("User", userSchema)