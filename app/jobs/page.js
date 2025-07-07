import { fetchJobsForRecruiterAction } from "@/actions/jobsActions";
import { fetchProfileAction } from "@/actions/recruiterActions";
import { JobListing } from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";

export default async function JobsPage(){

    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)

    const jobsList = await fetchJobsForRecruiterAction(user?.id)
    console.log(jobsList)

    return (
       <JobListing 
            user = {JSON.parse(JSON.stringify(user))} 
            profileInfo={profileInfo}
            jobsList={jobsList}
       />
    )
}