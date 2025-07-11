'use client'

import { CandidateList } from "../candidate-list"
import { Drawer, DrawerContent, DrawerTitle } from "../ui/drawer"
import { ScrollArea } from "../ui/scroll-area"

export function JobApplicants({
    showApplicantsDrawer,
    setShowApplicantsDrawer,
    currentCandidateDetals,
    setCurrentCandidateDetails,
    showCurrentCandidateDetailModal,
    setShowCurrentCandidateDetailModal,
    jobItem,
    jobApplications
}){

    return (
        <Drawer open={showApplicantsDrawer} onOpenChange={setShowApplicantsDrawer}>
            <DrawerContent className='max-h-[50vh]'>
                <DrawerTitle className='w-full text-center text-3xl font-extrabold'>Candidate List</DrawerTitle>
                <ScrollArea className='h-auto overflow-y-auto'>
                    <CandidateList
                     currentCandidateDetals={currentCandidateDetals}
                     setCurrentCandidateDetails={setCurrentCandidateDetails}
                     jobApplications={jobApplications}
                     showCurrentCandidateDetailModal={showCurrentCandidateDetailModal}
                     setShowCurrentCandidateDetailModal={setShowCurrentCandidateDetailModal}

                    />
                </ScrollArea>
            </DrawerContent>
        </Drawer>
 
    )
}