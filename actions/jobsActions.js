"use server"
import dbConnect from "@/config/database";
import Application from "@/models/Application";
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
export async function fetchJobsForCandidateAction(filterParams={}){
    await dbConnect();
    try{
        let updatedParams={}
        Object.keys(filterParams).forEach(filterKey=>{
            updatedParams[filterKey]={$in: filterParams[filterKey].split(',')}
        })
        const allJobs = await Jobs.find(filterParams && Object.keys(filterParams).length>0 ? updatedParams:{});
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

// create job application
export async function createJobApplicationAction(data, pathToRevalidate){
    await dbConnect()
    revalidatePath(pathToRevalidate)
    try{
        const newJobApplication = await Application.create(data)

        return{
            success:true,
            message:"Applied Successfully",
            data:JSON.parse(JSON.stringify(newJobApplication))
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

// fetch job Application for caniddate
export async function fetchJobApplicationForCandidate(candidateID){
    await dbConnect();
    try{
        const allApplications = await Application.find({candidateUserID:candidateID})
        return {
            success:true,
            message:"Applications fetched successfully",
            data:JSON.parse(JSON.stringify(allApplications))
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

// fetch job application for recriter
export async function fetchJobApplicationForRecriter(recruiterID){
    await dbConnect();
    try{
        const allApplications = await Application.find({recruiterUserID:recruiterID})
        return {
            success:true,
            message:"Applications fetched successfully",
            data:JSON.parse(JSON.stringify(allApplications))
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


// update job application : select or reject
export async function updateJobApplicationAction(data , pathToRevalidate){
    await dbConnect();
    revalidatePath(pathToRevalidate)
    try{
        
        const {status ,_id , ...otherDetails} = data;
        const updatedApplication = await Application.findOneAndUpdate({_id:_id} , {
            ...otherDetails,
            status:status,
        },{new :true});

        return {
            sucess:true,
            message:"Application Updated Successfully",
            data:JSON.parse(JSON.stringify(updatedApplication))
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


