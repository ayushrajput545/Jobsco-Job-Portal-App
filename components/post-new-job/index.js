"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { CommonForm } from "../common-form"
import { postNewJobFormControls } from "@/utils"
import { postNewJobAction } from "@/actions/jobsActions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function PostNewJob({profileInfo,user,jobsList}){

    const[showJobDialog , setShowJobDialog] = useState(false)
    const[jobFormData , setJobFormData] = useState({
        companyName:profileInfo?.data?.recruiterProfileInfo?.companyName,
        jobTitle:'',
        jobType:'',
        jobLocation:'',
        jobExperience:'',
        jobDescription:'',
        skills:''
    })
    const router = useRouter()

    function handlePostNewBtnValid(){
        return Object.keys(jobFormData).every(key => jobFormData[key].trim() !== '');
    }

    async function handleCreateNewJob(){
        const data = {
            ...jobFormData, // means jobsform data ke saare lelo
            recruiterId:user?.id,
            applicant:[] //initaalyy no one apply for this job
        }
        const toastid = toast.loading("Posting new Job")
        const response = await postNewJobAction(data , '/jobs')
      // console.log("resposne",response)
        toast.success("Job Posted Sucessfully", {
            id:toastid
        })
        setJobFormData({  // set it empty once diloge is closed
            companyName:profileInfo?.data?.recruiterProfileInfo?.companyName,
            jobTitle:'',
            jobType:'',
            jobLocation:'',
            jobExperience:'',
            jobDescription:'',
            skills:''
        })
        setShowJobDialog(false)
    }

    function handleAddNewJob(){

        // Recruiter only post job according premiuim plan he have
        if(!profileInfo?.data?.isPremiumUser && jobsList?.data?.length >=2){
            toast("You can post max 2 jobs" , {
                description: "Please opt for membership to post more jobs",
                action:{
                    label:"Buy Membership",
                    onClick:()=>router.push('/membership')
                }
            })
            return;
        }
        else if(profileInfo?.data?.isPremiumUser && (profileInfo?.data?.memberShipType==='basic' && jobsList?.data?.length >=5)){
                toast("You can post max 5 jobs" , {
                description: "Please upgrade your plan",
                action:{
                    label:"Upgrade Plan",
                    onClick:()=>router.push('/membership')
                }
            })
            return;
        }
        setShowJobDialog(true)
    }

    return (
        <div>
            <Button onClick={handleAddNewJob} className='disabled:opacity-60 flex h-11 items-center justify-center mt-5'>
                Post a Job
            </Button>
            <Dialog open={showJobDialog} onOpenChange={()=>{
                setShowJobDialog(false)
                setJobFormData({  // set it empty once diloge is closed
                    companyName:profileInfo?.data?.recruiterProfileInfo?.companyName,
                    jobTitle:'',
                    jobType:'',
                    jobLocation:'',
                    jobExperience:'',
                    jobDescription:'',
                    skills:''
                })
            }}>
                <DialogContent className='h-[600px] overflow-auto'>
                    <DialogHeader>
                        <DialogTitle>Post New Job</DialogTitle>
                        <div className="grid gap-4 py-4">
                            <CommonForm
                             buttonText='Add'
                             formData={jobFormData}
                             setFormData={setJobFormData}
                             formControls={postNewJobFormControls}
                             isBtnDisabled={!handlePostNewBtnValid()}
                             action={handleCreateNewJob}
                            />
                        </div>
                    </DialogHeader>
                </DialogContent>

            </Dialog>
        </div>
    )
}