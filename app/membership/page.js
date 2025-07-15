import { fetchProfileAction } from "@/actions/recruiterActions";
import { MemeberShip } from "@/components/memebership";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function MemberShipPage(){

    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)
    if(!profileInfo) redirect('/on-board')

    return(
        <MemeberShip profileInfo={profileInfo?.data}/>
    )
}