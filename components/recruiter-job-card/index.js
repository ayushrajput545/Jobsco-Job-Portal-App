import { Rocket } from "lucide-react";
import { CommonCard } from "../common-card";
import { Button } from "../ui/button";

export function RecruiterJobsCard({jobItem , jobApplications}){

    return (
        <div>
            <CommonCard
              icon={<Rocket size={50}/>}
              title={jobItem?.jobTitle}
              description={jobItem?.jobDescription}
              footerContent={
                <Button className='h-11 flex items-center justify-center px-5'>
                    {
                     jobApplications?.data?.filter(item=> item.jobID === jobItem?._id).length
                    } Applicants
                </Button>
              }
            />
        </div>
    )
}