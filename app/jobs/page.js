import { fetchJobApplicationForCandidate, fetchJobApplicationForRecriter, fetchJobsForCandidateAction, fetchJobsForRecruiterAction } from "@/actions/jobsActions";
import { createFilterCategoryAction } from "@/actions/otherActions";
import { fetchProfileAction } from "@/actions/recruiterActions";
import { JobListing } from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";

export default async function JobsPage({ searchParams }){

    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)

    const jobsList = profileInfo?.data?.accountType==="candidate"
    ? 
    await fetchJobsForCandidateAction(searchParams)
    : 
    await fetchJobsForRecruiterAction(user?.id)
   
    const getJobApplicationsList = profileInfo?.data?.accountType==="candidate"
    ?
    await fetchJobApplicationForCandidate(user?.id)
    :
    await fetchJobApplicationForRecriter(user?.id)


    const fetchFilterCategories = await createFilterCategoryAction();
 

    return (
       <JobListing 
            user = {JSON.parse(JSON.stringify(user))} 
            profileInfo={profileInfo}
            jobsList={jobsList}
            jobApplications={getJobApplicationsList}
            filterCategories= {fetchFilterCategories}
       />
    )
}