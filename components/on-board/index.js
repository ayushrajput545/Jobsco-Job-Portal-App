'use client'

import { useEffect, useState } from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '../ui/tabs'
import { CommonForm } from '../common-form'
import { candidateOnBoardFormControls, recruiterOnBoardFormControls } from '@/utils'
import { useUser } from '@clerk/nextjs'
import { createProfileAction } from '@/actions/recruiterActions'
import { createClient } from '@supabase/supabase-js'
import { createCandidateProfileAction } from '@/actions/candidateActions'

export function OnBoard(){

    const[currentTab , setCurrentTab] = useState('candidate')
    const [recruiterFormData , setRecruiterFormData] = useState({
        name:'',
        companyName:'',
        companyRole:''
    })
    const [ candidateFormData , setCandiDateFormData] = useState({
        resume:'',
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
    const [file , setFile] = useState(null)

    const currentAuthUser = useUser() // in client component we extract user like this
    const{user} = currentAuthUser; // destructture this

    const supaBaseClient = createClient(
        'https://daipgxuvatvcobzbxpjn.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhaXBneHV2YXR2Y29iemJ4cGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NTUwNjEsImV4cCI6MjA2NzUzMTA2MX0.PSR2jjzDJAM6VK6YpYj9grTUTx5gXB9_dFYDrlM6ld8'
    )//supabse project  url and api key

    function handleFileChange(e){
        e.preventDefault();
        setFile(e.target.files[0]);
    }

    useEffect(()=>{
        if(file) handleUploadPdfToSupabase()
    },[file])

    async function handleUploadPdfToSupabase(e){
        const{data,error}= await supaBaseClient.storage
         .from("job-portal")//bucket name
         .upload(`/public/${file.name}` , file , {
            cacheControl:"3600",
            upsert:false,
         })  // on which path file upload in storage
         console.log(data,error)

         if(data){
            setCandiDateFormData({
                ...candidateFormData,
                resume:data.path // this path store in mongoDB database
            })
         }
    }




    function handleTabChange(value){
        setCurrentTab(value)
    }

    function handleRecruiterFormValid(){  // this return true if all fields not empty
        return  (
            recruiterFormData &&
            recruiterFormData.name.trim() !== '' &&
            recruiterFormData.companyName.trim() !=='' &&
            recruiterFormData.companyRole.trim() !==''
        )
    }

    function handleCandidateFormValid(){
        return Object.keys(candidateFormData).every(key=> candidateFormData[key].trim()!=='');
    }

    async function handleCreateProfileAction(){
        const data = currentTab==='candidate' ? {
            userId:user?.id,
            email:user?.primaryEmailAddress?.emailAddress,
            isPremiumUser:false,
            accountType:"candidate",
            ...candidateFormData
        }:{
            userId: user?.id,
            email:user?.primaryEmailAddress?.emailAddress,
            isPremiumUser:false,
            accountType:"recruiter",
            name:recruiterFormData.name,
            companyName:recruiterFormData.companyName,
            companyRole:recruiterFormData.companyRole,
        }
        //call action
        if(currentTab==='candidate'){
            const result = await createCandidateProfileAction(data,'/on-board')
            console.log(result)
        }
        else{
            const result = await createProfileAction(data, "/on-board")
            console.log(result)
        }
         
         
    }


    return(
        <div className="w-11/12 mx-auto"> 
            <Tabs value={currentTab} onValueChange={handleTabChange}>
                <div className="w-full">
                    <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                            Welcome to Onboarding
                        </h1>
                        <TabsList>
                            <TabsTrigger value='candidate'>Candidate</TabsTrigger>
                            <TabsTrigger value='recruiter'>Recruiter</TabsTrigger>
                        </TabsList>
                    </div>
                </div>
                <TabsContent value='candidate'>
                    <CommonForm
                     formControls={candidateOnBoardFormControls}
                     buttonText={'On-Board as Candidate'}
                     formData={candidateFormData}
                     setFormData={setCandiDateFormData}
                     handleFileChange={handleFileChange}
                     action={handleCreateProfileAction}
                     isBtnDisabled={!handleCandidateFormValid()}
                    />
                </TabsContent>
                <TabsContent value='recruiter'>
                    <CommonForm
                     formControls={recruiterOnBoardFormControls}
                     buttonText={'On-Board as Recruiter'}
                     formData={recruiterFormData}
                     setFormData={setRecruiterFormData}
                     isBtnDisabled={!handleRecruiterFormValid()}
                     action={handleCreateProfileAction}
                    />
                </TabsContent>

            </Tabs>
        </div>

    )
}