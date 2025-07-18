import dbConnect from "@/config/database"
import ProjectDetail from "@/models/ProjectDetail";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req){

    try{
        await dbConnect();
        const project = await ProjectDetail.find({})
        return NextResponse.json({
            sucess:true,
            message:"Data Fetched Sucessfully",
            project:project
        })

    }
    catch(err){
        console.log(err)
        NextRequest.json({
            success:false,
            message:"Intenal Server Error"
        }, {status:500})
    }
}