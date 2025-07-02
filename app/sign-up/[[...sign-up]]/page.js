import { SignUp } from "@clerk/nextjs";

export default function SignUpPage(){
    return (
        <div className='w-11/12 min-h-[700px] mx-auto flex justify-center items-center'>
            <SignUp/>   
        </div>
    )
}