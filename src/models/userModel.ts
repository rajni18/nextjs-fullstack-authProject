import mongoose, {Schema , Document} from "mongoose" ;

export interface User extends Document{
    userName : string ;
    email : string ;
    password: string;
    isVerified : boolean;
    isAdmin : boolean;
    forgotPasswordToken? : string,
    forgotPasswordTokenExpiry? : Date,
    verifyToken? : string,
    verifyTokenExpiry? : Date,
}

const userSchema = new Schema({
    userName : {
        type : String,
        required : [true , "Username is required"] ,
        unique : true
    },
    email : {
        type : String,
        required : [true , "Email is required"] ,
        unique : true
    },
    password : {
        type : String,
        required : [true , "Password is required"] ,
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken : String,
    verifyTokenExpiry : Date,

})

const userModel = mongoose.models.User as mongoose.Model<User>||mongoose.model<User>("User",userSchema)

export default userModel ;