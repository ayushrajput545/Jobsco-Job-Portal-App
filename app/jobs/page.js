import { fetchJobApplicationForCandidate, fetchJobApplicationForRecriter, fetchJobsForCandidateAction, fetchJobsForRecruiterAction } from "@/actions/jobsActions";
import { createFilterCategoryAction } from "@/actions/otherActions";
import { fetchProfileAction } from "@/actions/recruiterActions";
import { JobListing } from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function JobsPage({ searchParams }){

    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)

    if(!user) redirect('/sign-in')
    if(user && !profileInfo?.data?._id) redirect('/on-board')

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