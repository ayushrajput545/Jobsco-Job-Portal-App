'use client'
import { Rocket } from "lucide-react";
import { CommonCard } from "../common-card";
import { Button } from "../ui/button";
import { useState } from "react";
import { JobApplicants } from "../job-Applicants";

export function RecruiterJobsCard({jobItem , jobApplications}){

  const[showApplicantsDrawer , setShowApplicantsDrawer] = useState(false);
  const[currentCandidateDetals , setCurrentCandidateDetails] = useState(null);
  const[showCurrentCandidateDetailModal , setShowCurrentCandidateDetailModal] = useState(false)

    return (
        <div>
            <CommonCard
              icon={<Rocket size={50}/>}
              title={jobItem?.jobTitle}
              description={jobItem?.jobDescription}
              footerContent={
                <Button 
                 disabled={jobApplications?.data?.filter(item=> item.jobID === jobItem?._id).length==0}
                 onClick={()=>setShowApplicantsDrawer(true)} 
                 className='h-11 flex items-center justify-center px-5'>
                    {
                     jobApplications?.data?.filter(item=> item.jobID === jobItem?._id).length
                    } Applicants
                </Button>
              }
            />

            <JobApplicants
             showApplicantsDrawer={showApplicantsDrawer}
             setShowApplicantsDrawer={setShowApplicantsDrawer}
             currentCandidateDetals={currentCandidateDetals}
             setCurrentCandidateDetails={setCurrentCandidateDetails}
             showCurrentCandidateDetailModal={showCurrentCandidateDetailModal}
             setShowCurrentCandidateDetailModal={setShowCurrentCandidateDetailModal}
             jobItem={jobItem}
             jobApplications={jobApplications?.data?.filter(item=>item?.jobID === jobItem?._id)}
            />
        </div>
    )
}