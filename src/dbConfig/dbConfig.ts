import mongoose from "mongoose";

export async function dbConnect() : Promise<void>{
    try{
        const dbConnection = await mongoose.connect(process.env.MONGODB_URI! ,{}) // we are sure it is string so we use !
        const connection = dbConnection.connection;
        connection.on("connected",()=>{
            console.log("database connected successfully")
        })
        connection.on("error",()=>{
            console.log("database connection failed")
            process.exit()
        })


    }catch(error){
        console.log("Database connection failed",error)
    }

}