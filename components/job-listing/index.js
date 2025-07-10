import { CandidateJobCard } from "../candidate-job-card";
import { PostNewJob } from "../post-new-job";
import { RecruiterJobsCard } from "../recruiter-job-card";

export function JobListing({user , profileInfo,jobsList , jobApplications}){

    return (
        <div>
            <div className="mx-auto w-11/12">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                        {
                            profileInfo?.data?.accountType === "candidate" 
                            ?
                            "Explore All Jobs"
                            :
                            "Jobs Dashboard"
                        }
                    </h1>
                    <div className="flex items-center">
                        {
                            profileInfo?.data?.accountType==="candidate"
                            ?
                            <p>Filter</p>
                            :
                            <PostNewJob user={user} profileInfo={profileInfo}/>
                        }
                    </div>
                </div>

                <div className="pt-6 pb-24">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                        <div className="lg:col-span-4">
                            <div className="container mx-auto p-0 space-y-8">
                                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                                    {
                                        jobsList?.data && jobsList?.data?.length>0 
                                        ?
                                        jobsList?.data.map((jobItem,i)=>(
                                            profileInfo?.data?.accountType==="candidate" 
                                            ? 
                                            <CandidateJobCard key={i} jobApplications={jobApplications} profileInfo={profileInfo} jobItem={jobItem}/>
                                            :
                                           <RecruiterJobsCard key={i} jobApplications={jobApplications} profileInfo={profileInfo} jobItem={jobItem}/>
                                        ))
                                        :
                                        null             
                                    
                                    }

                                </div>

                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}