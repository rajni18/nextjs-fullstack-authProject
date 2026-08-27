import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConfig";
var jwt = require('jsonwebtoken');


dbConnect()
export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successfully ",
            success: true
        })

        response.cookies.set("token","",{expires : new Date(0) })

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message, status: 500 })
    }

}