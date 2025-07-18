import mongoose from "mongoose"

const projectDetailSchema = new mongoose.Schema({

    views:{
        type:Number,
        default:0
    }
})

const ProjectDetail = mongoose.models.ProjectDetail || mongoose.model("ProjectDetail",projectDetailSchema)
export default ProjectDetail;