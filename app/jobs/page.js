import { fetchProfileAction } from "@/actions/recruiterActions";
import { JobListing } from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";

export default async function JobsPage(){

    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)

    return (
       <JobListing user = {JSON.parse(JSON.stringify(user))} profileInfo={profileInfo}/>
    )
}