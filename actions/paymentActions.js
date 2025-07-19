"use server"

import User from '@/models/User';
import { revalidatePath } from 'next/cache';

const stripe = require('stripe')(process.env.STRIPE_SK_KEY) // creating stripe instance from secret key

//create stripe price id based on the plan selection
export async function createPriceIdAction(data){
    const session = await stripe.prices.create({
        currency:"inr",
        unit_amount:data?.amount * 100,
        recurring:{
            interval:"year"
        },
        product_data:{
            name:"Premium Plan",
        },
    });
    return {
        success:true,
        id:session?.id
    }
}

// create stripe payment
export async function createStripePaymentAction(data){
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items:data?.lineItems,
        mode:"subscription",
        success_url:"https://jobsco-job-portal-app.vercel.app/membership" + "?status=success",
        cancel_url:"https://jobsco-job-portal-app.vercel.app/membership" + "?status=cancel",
    });

    return{
        success:true,
        id:session?.id
    }
}

// update user profile after sucessfull payment(when we got success url)
export async function updateUserProfile(data , pathToRevalidate){
    const {isPremiumUser ,  memberShipType, memberShipStartDate, memberShipEndDate,id,...profileInfo} = data;
    const updatedUser = await User.findOneAndUpdate({_id:id},{isPremiumUser ,  memberShipType, memberShipStartDate, memberShipEndDate ,...profileInfo}, {new:true})
    revalidatePath(pathToRevalidate)
}

