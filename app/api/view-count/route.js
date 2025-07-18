import dbConnect from "@/config/database"
import ProjectDetail from "@/models/ProjectDetail";
import { NextResponse } from "next/server"

export async function PUT(req){
    try{
        await dbConnect();
        const { id } = await req.json();
        if(!id){
            return NextResponse.json({
                sucess:false,
                message:"ID missing"
            },{status:400})
        }

        const project = await ProjectDetail.findByIdAndUpdate(id , {$inc:{views:1}} , {new:true})
        return NextResponse.json({
            sucess:true,
            message:"View Count Upadted",
            views:project
        })

    }
    catch(err){
        console.log(err)
        return NextResponse.json({
            sucess:false,
            message:"Internal Server Error! Please try again"
        },{status:500})
    }
}