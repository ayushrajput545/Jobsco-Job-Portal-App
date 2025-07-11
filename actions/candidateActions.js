"use server"
import dbConnect from "@/config/database";
import CandidateProfile from "@/models/CandidateProfile";
import { revalidatePath } from "next/cache";
import User from "@/models/User";

export async function createCandidateProfileAction(formData,pathToRevalidate){

    await dbConnect();
    revalidatePath(pathToRevalidate)
    try{
      const {accountType,isPremiumUser, userId,email, ...candidateFormData} = formData

      const newCandidateProfile = await CandidateProfile.create({
        ...candidateFormData  // all data came 
      })

      const newUser = await User.create({
        accountType,
        isPremiumUser,
        userId,
        email,
        candidateProfileInfo:newCandidateProfile?._id
      })

        return {
            success: true,
            message: "Profile Created Successfully",
            data: JSON.parse(JSON.stringify(newUser)),
        };

    }
    catch(err){
        console.log(err)
        return {
            success:false,
            message:"Internal Server Error! Please try again later"
        }
    }
}

// get candidate detail by candidate id 
export async function getCandidateDetailById(id){
  await dbConnect()
  try{
    const candidate = await User.findOne({userId:id}).populate('candidateProfileInfo').exec();
    return{
      success:true,
      message:"Candidate detail fetched successfully",
      data:JSON.parse(JSON.stringify(candidate))
    }

  }
  catch(err){
    console.log(err)
    return {
      success:false,
      message:"Internal Server Error! Please try again later "
    }
  }
}