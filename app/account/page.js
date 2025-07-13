import { fetchProfileAction } from "@/actions/recruiterActions";
import { AccountInfo } from "@/components/account-info";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AccountPage(){

    const user = await currentUser() // this is clerk user
    const profileInfo = await fetchProfileAction(user?.id) // all detail of user

    if(!profileInfo) redirect('/on-board')


    return (
        <AccountInfo profileInfo={profileInfo?.data}/>
 
    )
}