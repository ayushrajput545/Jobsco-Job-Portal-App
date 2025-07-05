'use client'

import { useState } from 'react'
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

    const currentAuthUser = useUser() // in client component we extract user like this
    const{user} = currentAuthUser; // destructture this



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

    async function handleCreateProfileAction(){
        const data = {
            userId: user?.id,
            email:user?.primaryEmailAddress?.emailAddress,
            isPremiumUser:false,
            accountType:"recruiter",
            name:recruiterFormData.name,
            companyName:recruiterFormData.companyName,
            companyRole:recruiterFormData.companyRole,
        }
        const result = await createProfileAction(data, "/on-board")
        console.log(result)
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