import mongoose, { mongo } from "mongoose"

const jobSchema = new mongoose.Schema({

    companyName:{
        type:String,
        required:true
    },
    jobTitle:String,
    jobType:String,
    jobLocation:String,
    jobExperience:String,
    jobDescription:String,
    skills:String,
    recruiterId:String,

    applicant:[  // which applicant applied for this job
        {
            name:String,
            email:String,
            userId:String,
            status:String  // accepted or rejected 
        }
    ]
})

const Jobs = mongoose.models.Jobs || mongoose.model("Jobs",jobSchema)
export default Jobs;