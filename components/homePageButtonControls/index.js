'use client'
import { redirect } from "next/navigation"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
export function HomePageButtonControls({user , profileInfo}){

    const router = useRouter();

    return(
        <div className='flex space-x-4'>
            <Button onClick={()=>router.push('/jobs')} className='flex h-11 items-center justify-center mt-5'>
                {
                    user
                    ? 
                      profileInfo?.data?.accountType==='candidate'? 'Browse Jobs':"Jobs Dashboard"
                    :
                    "Find jobs"
                }
            </Button>
            <Button onClick={()=>router.push(user ? profileInfo?.data?.accountType==='candidate'?'/activity':'/jobs':'/jobs')} className='flex h-11 items-center justify-center mt-5'>
                {
                    user 
                    ?
                    profileInfo?.data?.accountType==='candidate'?'Your Activity': 'Post a New Job'
                    :
                    'Post a New Job'
                }
            </Button>
        </div>
    )
}