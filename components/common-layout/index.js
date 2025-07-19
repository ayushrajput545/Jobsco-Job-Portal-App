import { currentUser } from "@clerk/nextjs/server";
import Header from "../header";
import { fetchProfileAction } from "@/actions/recruiterActions";
import Views from "../views";
import ReportBug from "../ReportBug";

export default async function CommonLayout({children}){ // this children came from layout.js

    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id);
    const project = await fetch('http://localhost:3000/api/get-count', {
    method:"GET",
    cache:'no-store'
  })
    const result = await project.json()
    const projectData = result?.project?.[0];

    const projectId = projectData?._id?.toString(); // ensure it's a string
    const viewCount = typeof projectData?.views === 'number' ? projectData.views : 0;
    return(
        <div>
            {/* Header component */}
            <Header user={JSON.parse(JSON.stringify(user))} profileInfo={profileInfo}/>

            {/* Main Component */}
            <main>{children}</main>

            {/* Views count */}
            <Views id={projectId} viewCount={viewCount}/>
            <ReportBug/>
        </div>
    )
}