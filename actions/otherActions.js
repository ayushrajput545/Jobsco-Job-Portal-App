"use server"

import dbConnect from "@/config/database"
import CandidateProfile from "@/models/CandidateProfile"
import Jobs from "@/models/Jobs"
import RecruiterProfile from "@/models/RecruiterProfile"
import { revalidatePath } from "next/cache"


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

//update account profile action
export async function updateCandidateProfileAction(data, pathToRevalidate){
    await dbConnect();
    revalidatePath(pathToRevalidate)
    try{
        const { _id, ...candidateFormData}= data
        const updatedProfile = await CandidateProfile.findOneAndUpdate({_id:_id} , {...candidateFormData} , {new:true})
        return {
            success:true,
            message:"Profile updated successfully",
            data:JSON.parse(JSON.stringify(updatedProfile))
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

//rectuitar
export async function updateRecruitarProfileAction(data, pathToRevalidate){
    await dbConnect();
    revalidatePath(pathToRevalidate)
    try{
        const { _id, ...recruitarFormData}= data
        const updatedProfile = await RecruiterProfile.findOneAndUpdate({_id:_id} , {...recruitarFormData} , {new:true})
        return {
            success:true,
            message:"Profile updated successfully",
            data:JSON.parse(JSON.stringify(updatedProfile))
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