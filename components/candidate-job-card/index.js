'use client'

import { Rocket } from "lucide-react"
import { CommonCard } from "../common-card"
import { Button } from "../ui/button"

export function CandidateJobCard({jobItem}){

    return(
        <div>
            <CommonCard
             icon={<Rocket size={50}/>}
             title={jobItem?.jobTitle}
             description={jobItem?.jobDescription}
             footerContent={
                <Button className='h-11 flex items-center justify-center px-5'>
                    View Details
                </Button>
              }
            />

 

        </div>
    )
}