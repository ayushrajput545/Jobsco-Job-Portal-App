import { fetchJobApplicationForCandidate, fetchJobApplicationForRecriter, fetchJobsForCandidateAction, fetchJobsForRecruiterAction } from "@/actions/jobsActions";
import { fetchProfileAction } from "@/actions/recruiterActions";
import { JobListing } from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";

export default async function JobsPage(){

    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)

    const jobsList = profileInfo?.data?.accountType==="candidate"
    ? 
    await fetchJobsForCandidateAction()
    : 
    await fetchJobsForRecruiterAction(user?.id)
   
    const getJobApplicationsList = profileInfo?.data?.accountType==="candidate"
    ?
    await fetchJobApplicationForCandidate(user?.id)
    :
    await fetchJobApplicationForRecriter(user?.id)

    return (
       <JobListing 
            user = {JSON.parse(JSON.stringify(user))} 
            profileInfo={profileInfo}
            jobsList={jobsList}
            jobApplications={getJobApplicationsList}
       />
    )
}