import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    userId:{   // from clerk
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    isPremiumUser:{
        type:Boolean
    },

    memberShipType:{
        type:String
    },

    memberShipStartDate:{
        type:String
    },

    memberShipEndDate:{
        type:String
    },

    accountType:{
        type:String,
        enum:["candidate" , "recruiter"],
        required:true
    },

    recruiterProfileInfo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RecruiterProfile"
    },

    candidateProfileInfo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CandidateProfile"
    }

})

const User = mongoose.models.User || mongoose.model("User",userSchema)
export default User;