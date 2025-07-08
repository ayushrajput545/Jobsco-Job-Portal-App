"use server"
import dbConnect from "@/config/database";
import Jobs from "@/models/Jobs";
import { revalidatePath } from "next/cache";

// post a job 
export async function postNewJobAction(formData , pathToRevalidate){

    await dbConnect();
    revalidatePath(pathToRevalidate)
    try{
        const newJob = await Jobs.create(formData)

        return{
            success:true,
            message:"Job Posted Successfully",
            data:JSON.parse(JSON.stringify(newJob))
        }

    }
    catch(err){
        console.log(err)
        return {
            success:false,
            message:"Internal Server Error! Please try again"
        }
    }
}

//fetch jobs for recruter from recruiterid that is passed
export async function fetchJobsForRecruiterAction(id){
    await dbConnect();
    try{
        const alljobs = await Jobs.find({recruiterId:id})
        return {
            success:true,
            message:"Jobs fetched successfully",
            data:JSON.parse(JSON.stringify(alljobs))
        }

    }
    catch(err){
        console.log(err)
        return {
            success:false,
            message:"Internal Server Error! Please try again"
        }
    }
}

//fetch all jobs for candidate that is created by all the rectuiter from mongoDB 
export async function fetchJobsForCandidateAction(){
    await dbConnect();
    try{
        const allJobs = await Jobs.find({});
        return{
            success:true,
            message:"Jobs fetched successfully",
            data:JSON.parse(JSON.stringify(allJobs))
        }
    }
    catch(err){
        console.log(err)
        return {
            success:false,
            message:"Internal Server Error! Please try again later"
        }
    }
}


