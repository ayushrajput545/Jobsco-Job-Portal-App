
export function JobListing({user , profileInfo}){

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

                </div>

            </div>
        </div>
    )
}