"use server"

import dbConnect from "@/config/database"
import Jobs from "@/models/Jobs"

export async function createFilterCategoryAction(){

    await dbConnect()
    try{
        const response = await Jobs.find({})
        return JSON.parse(JSON.stringify(response))
    }
    catch(err){
        console.log(err)
        return {
            success:false,
            message:"Internal Server Error! Please try again later"
        }
    }

}