import { NextRequest,NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/sendMailer";

 dbConnect()
export async function POST(request : NextRequest){
    try{
        const reqBody = await request.json();
        const {userName,email,password} = reqBody;
        console.log("user details---",reqBody)
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error : "User already exist" , status : 400})
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            userName ,
            email,
            password : hashPassword
        })
        const savedUser = await newUser.save();
        console.log("savedUser-----",savedUser);

        //send email
         await sendEmail({email,emailType :"VERIFY",userId : savedUser._id})


        return NextResponse.json({
            message : "User created successfully",
            success : true,
            savedUser
        })

    }catch(error : any){
        return NextResponse.json({error:error.message,status:500})
    }
    


}