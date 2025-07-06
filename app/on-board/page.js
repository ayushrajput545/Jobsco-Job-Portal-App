import { fetchProfileAction } from "@/actions/recruiterActions";
import { OnBoard } from "@/components/on-board";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function OnBoardedPage(){

    const user = await currentUser();

    const profileInfo = await fetchProfileAction(user?.id);
    if(profileInfo?.data?._id){
        if(profileInfo?.data?.accountType === 'recruiter' && !profileInfo?.data?.isPremiumUser){
            redirect('/membership')
        }
        else{
            redirect('/')
        }
    }
    else{
        return <OnBoard/>
    }
}