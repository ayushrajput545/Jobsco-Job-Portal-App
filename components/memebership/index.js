'use client'

import { MemberShipPlans } from "@/utils"
import { CommonCard } from "../common-card"
import { Rocket } from "lucide-react"
import { Button } from "../ui/button"
import { createPriceIdAction, createStripePaymentAction, updateUserProfile } from "@/actions/paymentActions"
import { loadStripe } from "@stripe/stripe-js"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function MemeberShip({profileInfo}){

    const pathName = useSearchParams()
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK_KEY) // npm i @stripe/stripe-js

    async function handlePayment(currentPlan){
        const stripe = await stripePromise
        const extractPriceID = await createPriceIdAction({
            amount:Number(currentPlan?.price)
        });

        if(extractPriceID){
            sessionStorage.setItem("currentPlan", JSON.stringify(currentPlan))
            const payment = await createStripePaymentAction({
                lineItems:[
                    {
                        price:extractPriceID?.id,
                        quantity:1
                    }
                ]
            });

            await stripe.redirectToCheckout({
                sessionId:payment?.id
            });
        }
        
    }

    async function updateProfile(){
        const currentPlan = JSON.parse(sessionStorage.getItem("currentPlan"));
        const data={
            ... profileInfo,
            isPremiumUser:true,
            memberShipType:currentPlan?.type,
            memberShipStartDate:new Date().toString(),
            memberShipEndDate:new Date(
                (new Date().getFullYear() + (
                    currentPlan?.type === 'basic' ? 1 : currentPlan?.type === 'teams' ? 2 : 5
                )),
                new Date().getMonth(),
                new Date().getDate()
            ),
            id:profileInfo?._id,   
        }

        const response = await updateUserProfile(data , '/membership')
        // console.log(profileInfo)
    }

    useEffect(()=>{

        if(pathName.get("status")==="success") updateProfile();

    },[pathName])

    return(
        <div className="w-11/12 mx-auto">
            <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-950">
                    {
                        profileInfo?.isPremiumUser ?"You are a Premium user":"Choose Your Best Plan"
                    }
                </h1>
                <div>
                    {
                        profileInfo?.isPremiumUser ?
                        <Button>
                            {MemberShipPlans.find(
                                (planItem)=>planItem.type === profileInfo?.memberShipType
                            ).heading}
                        </Button> : null
                    }
                </div>
            </div>

            <div className="py-20 pb-24 pt-6">
                <div className="container mx-auto p-0 space-y-8 ">
                    <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                        {
                            MemberShipPlans.map((plan,i)=>(
                                <CommonCard key={i}
                                  icon={
                                    <div className="flex justify-between">
                                        <div><Rocket size={45}/></div>
                                        <h1 className="font-bold text-4xl">{plan.heading}</h1>
                                    </div>
                                  }
                                  title={`$ ${plan.price} /yr`}
                                  description={plan?.type}
                                  footerContent={
                                    profileInfo?.memberShipType==='enterprise' ||
                                    (profileInfo?.memberShipType==='basic' && i ===0) ||
                                    (profileInfo?.memberShipType==='teams' && i >=0 && i<2)
                                    ?
                                    null
                                    :
                                    <Button onClick={()=>handlePayment(plan)}>
                                        {
                                            profileInfo?.memberShipType==='basic' ||
                                            profileInfo?.memberShipType ==='teams' ? 'Update Plan' : 'Get Premium'
                                        }
                                    </Button>
                                  }
                                />
                            ))
                        }

                    </div>

                </div>

            </div>
             
        </div>
    )
}