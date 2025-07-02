import { currentUser } from "@clerk/nextjs/server";
import Header from "../header";

export default async function CommonLayout({children}){ // this children came from layout.js

    const user = await currentUser()


    return(
        <div>
            {/* Header component */}
            <Header user={JSON.parse(JSON.stringify(user))}/>

            {/* Main Component */}
            <main>{children}</main>
        </div>
    )
}