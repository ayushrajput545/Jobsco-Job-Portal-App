'use client'

import { Rocket } from "lucide-react"
import { CommonCard } from "../common-card"
import { Button } from "../ui/button"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "../ui/drawer"
import { useState } from "react"
import { createJobApplicationAction } from "@/actions/jobsActions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function CandidateJobCard({jobItem ,profileInfo,jobApplications}){

    const[showJobDetailDrawer , setShowJobDetailDrawer] = useState(false);
    const router = useRouter()

    async function handleJobApply(){

        if(!profileInfo?.data?.isPremiumUser && jobApplications?.data?.length >=2){
            toast("You can apply max 2 jobs" , {
                description: "Please opt for membership to apply more jobs",
                action:{
                    label:"Buy Membership",
                    onClick:()=>router.push('/membership')
                }
            })
            return;
        }
        else if(profileInfo?.data?.isPremiumUser && (profileInfo?.data?.memberShipType==='basic' && jobApplications?.data?.length >=5)){
                toast("You can apply in max 5 jobs" , {
                description: "Please upgrade your plan",
                action:{
                    label:"Upgrade Plan",
                    onClick:()=>router.push('/membership')
                }
            })
            return;
        }

        const toastid = toast.loading("Loading...")
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
        if(result?.success){
            toast.success("Applied Sucessfully!",{
            id:toastid,
            action:{
                label:"Check Here",
                onClick:()=>router.push('/activity')
            }
        })
        }
        else{
            toast.error(result?.message,{
            id:toastid
        })
        }
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
                        <h2 className="text-xl font-bold text-gray-500 ">{jobItem?.jobType}</h2>
                    </div>

                    <h3 className="text-2xl font-medium text-black mt-3">Experience: {jobItem?.jobExperience}</h3>

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