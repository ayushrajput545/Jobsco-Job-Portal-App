import mongoose from "mongoose"

const candidateProfileSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    currentJobLocation:{
        type:String
    },

    currentCompany:{
        type:String
    },

    currentSalary:{
        type:String
    },

    noticePeriod:{
        type:String
    },

    skills:{
        type:String,
        required:true
    },

    totalExperience:{
        type:String
    },

    collegeInfo:{
        type:String,
        required:true
    },

    linkdin:{
        type:String
    },
    resume:{
        type:String
    }

})

const CandidateProfile = mongoose.models.CandidateProfile || mongoose.model("CandidateProfile",candidateProfileSchema);
export default CandidateProfile;