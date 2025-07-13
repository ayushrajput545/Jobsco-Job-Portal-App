"use client"
import { useEffect, useState } from "react"
import { CommonForm } from "../common-form"
import { candidateOnBoardFormControls, recruiterOnBoardFormControls } from "@/utils"
import { updateCandidateProfileAction, updateRecruitarProfileAction } from "@/actions/otherActions"
export function AccountInfo({profileInfo}){

    const [ candidateFormData , setCandiDateFormData] = useState({
        name:'',
        currentCompany:'',
        currentJobLocation:'',
        currentSalary:'',
        noticePeriod:'',
        skills:'',
        totalExperience:'',
        collegeInfo:'',
        linkedin:'',
    })

    const [recruiterFormData , setRecruiterFormData] = useState({
        name:'',
        companyName:'',
        companyRole:''
    })

    useEffect(() => {
        if (profileInfo?.accountType === 'recruiter') {
            setRecruiterFormData(prev => ({
                ...prev,
                ...profileInfo?.recruiterProfileInfo
            }));
        }
        if (profileInfo?.accountType === 'candidate') {
            setCandiDateFormData(prev => ({
                ...prev,
                ...profileInfo?.candidateProfileInfo
            }));
        }
    }, [profileInfo]);


    // console.log("This is profile infoi",profileInfo)
    console.log("Recuiterformdata",recruiterFormData)
    async function handleUpdateProfile(){
        
        const data= profileInfo?.accountType==='candidate' ?
            {
                ...candidateFormData,
                _id:profileInfo?.candidateProfileInfo?._id
            }
            :
            {
                ...recruiterFormData,
                _id:profileInfo?.recruiterProfileInfo?._id
            }
        const response = profileInfo?.accountType==='candidate' ?
          await updateCandidateProfileAction(data, '/account')
          :
          await updateRecruitarProfileAction(data,'/account')
        console.log(response)
    }

  

    return (
        <div className="w-11/12 mx-auto ">
            <div className="flex items-baseline justify-between pb-6 border-b pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-950">
                    Account Details
                </h1>
            </div>

            <div className="py-20 pb-24 pt-6">
                <div className="container mx-auto p-0 space-y-8">
                    <CommonForm
                     formControls={
                        profileInfo?.accountType==='candidate' ? candidateOnBoardFormControls.filter(formControl=>formControl.name !== 'resume') : recruiterOnBoardFormControls
                     }
                     formData={
                        profileInfo?.accountType==='candidate' ? candidateFormData : recruiterFormData
                     }
                     setFormData={
                        profileInfo?.accountType==='candidate' ? setCandiDateFormData : setRecruiterFormData
                     }
                     buttonText={'Update Profile'}
                     action={handleUpdateProfile}
                    />
                </div>

            </div>
             
        </div>
    )
}