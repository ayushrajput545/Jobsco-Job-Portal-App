'use client'

import { Rocket } from "lucide-react"
import { CommonCard } from "../common-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

export function CandidateActivity({jobList , jobApplications}){
 

    const uniqueStatusArray = [... new Set(jobApplications.map(item=>item?.status).flat(1))]
   

    return (
        <div className="mx-auto w-11/12 max-w-7xl">
            <Tabs defaultValue="Applied" className="w-full">
                <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                    <h1 className="text-4xl font-bold text-gray-950 tracking-tight">Your Activity</h1>
                    <TabsList>
                        {
                            uniqueStatusArray.map((status,i)=>(
                                <TabsTrigger key={i} value={status}>{status}</TabsTrigger>
                            ))
                        }
                   </TabsList>
                </div>
                <div className="pb-24 pt-6">
                    <div className="container mc-auto p-0 space-y-8">
                        <div className="flex flex-col gap-4">
                            {
                                uniqueStatusArray.map((status ,i)=>(
                                    <TabsContent className="flex flex-col gap-4" key={i} value={status}>
                                        {
                                            jobList.filter(jobListItem=>
                                                jobApplications.filter(jobApplicationItem=>jobApplicationItem.status.indexOf(status)>-1)
                                                .findIndex(filteredItemByStatus=>jobListItem?._id ===filteredItemByStatus?.jobID)>-1

                                            ).map((finalFilteredItem,i)=><CommonCard key={i} icon={<Rocket size={40}/>} title={finalFilteredItem?.jobTitle} description={finalFilteredItem?.jobDescription} />)
                                        }
                                        
                                    </TabsContent>
                                ))
                            }

                        </div>

                    </div>

                </div>

            </Tabs>


        </div>
    )
}