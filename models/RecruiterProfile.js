import mongoose from "mongoose"

const recruiterProfileSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    companyName:{
        type:String,
        required:true
    },

    roleInCompany:{
        type:String,
        required:true
    }
})

const RecruiterProfile = mongoose.models.RecruiterProfile || mongoose.model("RecruiterProfile" , recruiterProfileSchema);
export default RecruiterProfile;