'use client'

import { Rocket } from "lucide-react"
import { CommonCard } from "../common-card"
import { Button } from "../ui/button"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "../ui/drawer"
import { useState } from "react"
import { createJobApplicationAction } from "@/actions/jobsActions"

export function CandidateJobCard({jobItem ,profileInfo,jobApplications}){

    const[showJobDetailDrawer , setShowJobDetailDrawer] = useState(false);

    async function handleJobApply(){

        const data={
            recruiterUserID:jobItem?.recruiterId,
            name:profileInfo?.data?.candidateProfileInfo?.name,
            email:profileInfo?.data?.email,
            candidateUserID:profileInfo?.data?.userId,
            status:['Applied'],
            jobID:jobItem?._id,
            jobAppliedDate:new Date().toLocaleDateString(),
        }

        const result = await createJobApplicationAction(data , '/jobs');
        setShowJobDetailDrawer(false)
    }

    return(
        <div>
            <Drawer open={showJobDetailDrawer} onOpenChange={setShowJobDetailDrawer}>
                <CommonCard
                icon={<Rocket size={50}/>}
                title={jobItem?.jobTitle}
                description={jobItem?.jobDescription}
                footerContent={
                    <Button onClick={()=>setShowJobDetailDrawer(true)} className='h-11 flex items-center justify-center px-5'>
                        View Details
                    </Button>
                }
                />

                <DrawerContent className='p-6'>
                    <DrawerHeader className='px-0'>
                        <div className="flex justify-between">
                            <DrawerTitle className='text-4xl font-extrabold text-gray-800'>{jobItem?.jobTitle}</DrawerTitle>
                            <div className="flex gap-3">
                                <Button 
                                 onClick={handleJobApply}
                                 className='h-11 flex items-center justify-center px-5'
                                 disabled={
                                    jobApplications?.data?.findIndex(item=> item.jobID === jobItem?._id)>-1 ?true:false 
                                 }
                                >
                                    {
                                        jobApplications?.data?.findIndex(item=> item.jobID === jobItem?._id)>-1 ?"Applied":"Apply"
                                    }
                                </Button>
                                <Button onClick={()=>setShowJobDetailDrawer(false)} className='h-11 flex items-center justify-center px-5'>Cancel</Button>
                            </div>
                        </div>
                    </DrawerHeader>
                    <DrawerDescription className='text-2xl font-medium text-gray-600'>
                        {jobItem?.jobDescription}
                        <span className="text-xl font-normal text-gray-500 ml-4">{jobItem?.jobLocation} </span>
                    </DrawerDescription>

                    <div className="flex items-center h-[40px]">
                        <h2 className="text-xl font-bold text-gray-500 ">{jobItem?.jobType} Time </h2>
                    </div>

                    <h3 className="text-2xl font-medium text-black mt-3">Experience: {jobItem?.jobExperience} months</h3>

                    <div className="flex gap-4 mt-6 ">
                        {
                            jobItem?.skills.split(',').map((skillItem,i)=>(
                                <div key={i} className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                                    <h2 className="text-[13px] font-medium text-white">
                                        {skillItem}
                                    </h2>
                                </div>
                            ))
                        }
                    </div>
                </DrawerContent>
            </Drawer>
 
        </div>
    )
}