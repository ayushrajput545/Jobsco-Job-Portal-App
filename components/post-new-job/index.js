"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { CommonForm } from "../common-form"
import { postNewJobFormControls } from "@/utils"
import { postNewJobAction } from "@/actions/jobsActions"

export function PostNewJob({profileInfo,user}){

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

    function handlePostNewBtnValid(){
        return Object.keys(jobFormData).every(key => jobFormData[key].trim() !== '');
    }

    async function handleCreateNewJob(){
        const data = {
            ...jobFormData, // means jobsform data ke saare lelo
            recruiterId:user?.id,
            applicant:[] //initaalyy no one apply for this job
        }
        const response = await postNewJobAction(data , '/jobs')
      // console.log("resposne",response)
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

    return (
        <div>
            <Button onClick={()=>setShowJobDialog(true)} className='disabled:opacity-60 flex h-11 items-center justify-center mt-5'>
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