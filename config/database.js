import mongoose from "mongoose";

export default async function dbConnect(){

    await mongoose.connect(process.env.DB_URL)
    .then(()=>console.log("DB CONNECTION SUCCESSFUL"))
    .catch((err)=>{
        console.log(err)
        console.log("Failed to connect DB")
    })
}