"use server"
import dbConnect from "@/config/database";
import RecruiterProfile from "@/models/RecruiterProfile";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

// create profile
export async function createProfileAction(formData , pathToRevalidate){
    await dbConnect();
    revalidatePath(pathToRevalidate);
    const {name , companyName , companyRole ,accountType,isPremiumUser, userId, email} = formData
    try{
        //1. Create recruter profile first that gave use _id that should be store in user 
        const newRecruiterProfile = await RecruiterProfile.create({
            name:name,
            companyName:companyName,
            roleInCompany:companyRole
        })
        // 2. Create the user and reference the recruiter profile
        const newUser = await User.create({
            accountType,
            isPremiumUser,
            userId,
            email,
            recruiterProfileInfo:newRecruiterProfile._id    
        })
        return {
            success: true,
            message: "Profile Created Successfully",
            data: JSON.parse(JSON.stringify(newUser)),
        };
    }
    catch(err){
        console.log(err)
        console.log(accountType)
        return {
            success:false,
            message:"Internal Server Error! Please try again later"
        }
    }
}

// fetch profile on OnBoard page for both caniddate and recruiter
export async function fetchProfileAction(id){
    await dbConnect();
    try{
        const response = await User.findOne({userId:id}).populate('recruiterProfileInfo').populate('candidateProfileInfo').exec();
        return {
            success:true,
            message:"Data fetched successfully",
            data:JSON.parse(JSON.stringify(response))
        }

    }
    catch(err){
        console.log(err)
        return {
            success:false,
            message:"Internal Server error! Please try again"
        }
    }

}