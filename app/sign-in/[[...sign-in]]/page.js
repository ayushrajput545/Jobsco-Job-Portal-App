import {SignIn} from '@clerk/nextjs'

export default function SignInPage(){
    return  (
        <div className='w-11/12 min-h-[700px] mx-auto flex justify-center items-center'>
            <SignIn/>
        </div>
    )
}