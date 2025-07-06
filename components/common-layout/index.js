import { currentUser } from "@clerk/nextjs/server";
import Header from "../header";
import { fetchProfileAction } from "@/actions/recruiterActions";

export default async function CommonLayout({children}){ // this children came from layout.js

    const user = await currentUser()
    const profileInfo = await fetchProfileAction();


    return(
        <div>
            {/* Header component */}
            <Header user={JSON.parse(JSON.stringify(user))} profileInfo={profileInfo}/>

            {/* Main Component */}
            <main>{children}</main>
        </div>
    )
}