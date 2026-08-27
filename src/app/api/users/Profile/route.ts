import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import bcrypt from "bcryptjs";
var jwt = require('jsonwebtoken');


dbConnect()
export async function POST(request: NextRequest) {
    try{
        const token = request.cookies.get('token')?.value || ''
        const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET)
        const userId = decodedToken.id ;
        const user = await User.findOne({_id : userId});
        if(!user){
            return NextResponse.json({error : "User not authenticated" , status : 400})
        }
        return NextResponse.json({message : "User found" , data : user})

    }catch(error :any){
        return NextResponse.json({error:error.message , status : 500})
    }
}