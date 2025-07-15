"use client"
import { filterMenuData, formUrlQuery } from "@/utils";
import { CandidateJobCard } from "../candidate-job-card";
import { PostNewJob } from "../post-new-job";
import { RecruiterJobsCard } from "../recruiter-job-card";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "../ui/menubar";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function JobListing({user , profileInfo,jobsList , jobApplications ,filterCategories}){

   const[filterParams , setFilterParams] = useState({})
   const searchParams = useSearchParams()
   const router = useRouter()
   const filterMenus = filterMenuData.map((item)=>({
    id:item?.id,
    name:item?.label,
    options:[
        ...new Set(filterCategories.map((listItem)=>listItem[item.id]))// contain all ragisters options , ex: onClick companyName filter all company names appaears same for location and all
    ]
   }))

   useEffect(()=>{
    setFilterParams(JSON.parse(sessionStorage.getItem("filterParams"))) // on refreshing page our filter data not gone
   },[])

   useEffect(()=>{
    if(filterParams && Object.keys(filterParams).length>0){
        let url=""
        url=formUrlQuery({
            params:searchParams.toString(),
            dataToAdd:filterParams
        })
        router.push(url , {scroll:false})
    }

   },[filterParams, searchParams])

   function handleFilter(currentSection , currentOption){
    let cpyFilterParams = {...filterParams}
    const indexOfCurrentSection = Object.keys(cpyFilterParams).indexOf(currentSection)
    if(indexOfCurrentSection===-1){
        cpyFilterParams={
            ...cpyFilterParams,
            [currentSection]:[currentOption]
        }
    }
    else{
        const indexOfCurrentSection = cpyFilterParams[currentSection].indexOf(currentOption)
        if(indexOfCurrentSection===-1){
            cpyFilterParams[currentSection].push(currentOption)
        }
        else{
            cpyFilterParams[currentSection].splice(indexOfCurrentSection,1)
        }
    }
    setFilterParams(cpyFilterParams)
    sessionStorage.setItem('filterParams', JSON.stringify(cpyFilterParams))
    console.log(cpyFilterParams)

   }

   

    return (
        <div>
            <div className="mx-auto w-11/12">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                        {
                            profileInfo?.data?.accountType === "candidate" 
                            ?
                            "Explore All Jobs"
                            :
                            "Jobs Dashboard"
                        }
                    </h1>
                    <div className="flex items-center">
                        {
                            profileInfo?.data?.accountType==="candidate"
                            ?
                            <Menubar>
                                {
                                    filterMenus.map((filterMenu,i)=>(
                                        <MenubarMenu key={i}>
                                            <MenubarTrigger>{filterMenu?.name}</MenubarTrigger>
                                            <MenubarContent>
                                                {
                                                    filterMenu.options.map((option,optionIdx)=>(
                                                        <MenubarItem onClick={()=>handleFilter(filterMenu.id , option)} key={optionIdx} className='flex items-center'>
                                                            <div className={`h-4 w-4 border rounded border-gray-900 ${filterParams && Object.keys(filterParams).length>0 && filterParams[filterMenu.id] && filterParams[filterMenu.id].indexOf(option)>-1 ? 'bg-black':""}`}/>
                                                            <Label className="ml-3 cursor-pointer text-sm text-gray-600">{option}</Label>

                                                        </MenubarItem>
                                                    ))
                                                }
                                            </MenubarContent>
                                        </MenubarMenu>
                                    ))
                                }
                            </Menubar>
                            :
                            <PostNewJob user={user} profileInfo={profileInfo} jobsList={jobsList}/>
                        }
                    </div>
                </div>

                <div className="pt-6 pb-24">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                        <div className="lg:col-span-4">
                            <div className="container mx-auto p-0 space-y-8">
                                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                                    {
                                        jobsList?.data && jobsList?.data?.length>0 
                                        ?
                                        jobsList?.data.map((jobItem,i)=>(
                                            profileInfo?.data?.accountType==="candidate" 
                                            ? 
                                            <CandidateJobCard key={i} jobApplications={jobApplications} profileInfo={profileInfo} jobItem={jobItem}/>
                                            :
                                           <RecruiterJobsCard key={i} jobApplications={jobApplications} profileInfo={profileInfo} jobItem={jobItem}/>
                                        ))
                                        :
                                        null             
                                    
                                    }

                                </div>

                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}