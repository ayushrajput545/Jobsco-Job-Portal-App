'use client'

import { getCandidateDetailById } from "@/actions/candidateActions"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog"
import { createClient } from "@supabase/supabase-js"
import { updateJobApplicationAction } from "@/actions/jobsActions"
import { toast } from "sonner"

export function CandidateList({
    currentCandidateDetals,
    setCurrentCandidateDetails,
    jobApplications,
    showCurrentCandidateDetailModal,
    setShowCurrentCandidateDetailModal
}){

    const supaBaseClient = createClient(
        'https://daipgxuvatvcobzbxpjn.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhaXBneHV2YXR2Y29iemJ4cGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NTUwNjEsImV4cCI6MjA2NzUzMTA2MX0.PSR2jjzDJAM6VK6YpYj9grTUTx5gXB9_dFYDrlM6ld8'
    )//supabse project  url and api key

    async function handleFetchCandidateDetail(id){
        const response = await getCandidateDetailById(id);
        console.log(response)
        if(response){
            setCurrentCandidateDetails(response?.data);
            setShowCurrentCandidateDetailModal(true)
        }
    }

    function handlePreviewResume(){
        const{data,error}= supaBaseClient.storage
            .from('job-portal-public')
            .getPublicUrl(currentCandidateDetals?.candidateProfileInfo?.resume) // this will give public url

            console.log(data)
        
        const a = document.createElement('a') //Creates an invisible <a> (anchor) HTML element.
        a.href= data?.publicUrl;              //Sets the anchor’s href to the public URL of the resume.
        a.setAttribute("download","Resume.pdf") //Instructs the browser to download the file and name it Resume.pdf.
        a.setAttribute("target","_blank")// Ensures that the resume opens in a new tab instead of replacing the current page.
        document.body.appendChild(a)  //Adds the anchor to the page.
        a.click() //Programmatically "clicks" it, triggering the download or tab opening.
        document.body.removeChild(a); //Removes the anchor from the page.

    }

    async function handleUpdateJobStatus(getCurrentStatus){
        const toastid = toast.loading("Loading...")
        let cpyJobApplicants = [...jobApplications]
        const indexOfCurrentJobApplicant = cpyJobApplicants.findIndex(item=>item.candidateUserID===currentCandidateDetals?.userId)
         
        const data = {
            ...cpyJobApplicants[indexOfCurrentJobApplicant],
            status:cpyJobApplicants[indexOfCurrentJobApplicant].status.concat(getCurrentStatus)
        }

        const response = await updateJobApplicationAction(data, '/jobs')
        toast.success(response?.message, {
            id:toastid
        })
        // const response = await updateJobApplicationAction()
    }



    return (
        <div className="grid grid-cols-1 gap-3 p-10  md:grid-cols-2 lg:grid-cols-3">
            {
                jobApplications?.map((item,i)=>(
                    <div key={i} className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                        <div className="px-4 my-6 flex justify-between items-center">
                            <h3 className="text-lg font-bold">{item?.name}</h3>
                            <Button
                              onClick={()=>handleFetchCandidateDetail(item?.candidateUserID)}
                              className='h-11 flex items-center justify-center px-5'
                              >
                                View Profile
                            </Button>
                        </div>

                    </div>
                ))
            }

            <Dialog open={showCurrentCandidateDetailModal} onOpenChange={()=>{  // on close the dialog
                setCurrentCandidateDetails(null)
                setShowCurrentCandidateDetailModal(false)
            }}>
                <DialogTitle></DialogTitle>
                <DialogContent>
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold">{currentCandidateDetals?.candidateProfileInfo?.name}</h1>
                        <h2>{currentCandidateDetals?.email}</h2>
                    </div>
                    <div className="flex flex-col gap-3 mb-3 border p-4 rounded-lg relative">
                        <p className="absolute -top-3 -left-2 text-slate-500 bg-white mx-5 font-sans text-sm  italic">Current Company Details</p>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                          <p> <span className="font-semibold">Current Company: </span>{currentCandidateDetals?.candidateProfileInfo?.currentCompany}</p>
                          <p> <span className="font-semibold">Current Job Location: </span>{currentCandidateDetals?.candidateProfileInfo?.currentJobLocation}</p>
                        </div>

                        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                            <p> <span className="font-semibold">Current Salary: </span>{currentCandidateDetals?.candidateProfileInfo?.currentSalary}</p>
                            <p> <span className="font-semibold">Notice Period: </span>{currentCandidateDetals?.candidateProfileInfo?.noticePeriod}</p>
                        </div>
                    </div>
                    
                    <div>
                        <p><span className="font-semibold">Total Experience: </span>{currentCandidateDetals?.candidateProfileInfo?.totalExperience}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-6 mb-5">
                        {
                            currentCandidateDetals?.candidateProfileInfo?.skills.split(',').map((skillItem,i)=>(
                                <div key={i} className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                                    <h2 className="text-[13px] font-medium text-white">
                                        {skillItem}
                                    </h2>
                                </div>
                            ))
                        }
                    </div>
                    <Button onClick={handlePreviewResume} className='h-11 flex items-center justify-center px-5'>See Resume</Button>
                    <DialogFooter className='flex'>
                        <div className="flex gap-3">
                            <Button  
                             onClick={()=>handleUpdateJobStatus('selected')}
                             className='h-11 flex items-center justify-center px-5'
                             disabled={
                                jobApplications.find((item)=>item.candidateUserID === currentCandidateDetals?.userId)?.status.includes("selected") ||
                                jobApplications.find((item)=>item.candidateUserID === currentCandidateDetals?.userId)?.status.includes("rejected")
                                  }
                            >
                                {
                                    jobApplications.find((item)=>item.candidateUserID === currentCandidateDetals?.userId)?.status.includes("selected")
                                    ?
                                    "Selected"
                                    :
                                    "Select"
                                }
                            </Button>
                            <Button 
                             onClick={()=>handleUpdateJobStatus('rejected')}
                             className='h-11 flex items-center justify-center px-5 bg-red-500 hover:bg-red-600'
                             disabled={
                                jobApplications.find((item)=>item.candidateUserID === currentCandidateDetals?.userId)?.status.includes("rejected") ||
                                jobApplications.find((item)=>item.candidateUserID === currentCandidateDetals?.userId)?.status.includes("selected")
                              }
                            >
                                {
                                    jobApplications.find((item)=>item.candidateUserID === currentCandidateDetals?.userId)?.status.includes("rejected")
                                    ?
                                    "Rejected"
                                    :
                                    "Reject"
                                }
                            </Button>
                        </div>
                   </DialogFooter>
                </DialogContent>

            </Dialog>
            
        </div>
    )
}