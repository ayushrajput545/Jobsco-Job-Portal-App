import { fetchJobApplicationForCandidate, fetchJobsForCandidateAction } from "@/actions/jobsActions"
import { CandidateActivity } from "@/components/candidate-activity";
import { currentUser } from "@clerk/nextjs/server"

export default async function Activity(){

    const user = await currentUser()
    const jobList = await fetchJobsForCandidateAction()
    const jobApplications = await fetchJobApplicationForCandidate(user?.id);

    return(
        <CandidateActivity
         jobList={jobList?.data}
         jobApplications={jobApplications?.data}
        />
      
    )
}