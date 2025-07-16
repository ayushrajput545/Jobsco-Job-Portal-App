'use client'

import { AlignJustify } from "lucide-react"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger ,   SheetHeader,
  SheetTitle, } from "../ui/sheet"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"

 

export default function Header({user , profileInfo}){

    const pathname = usePathname()
    // console.log("pathname", pathname)

    const menuItems =[
        {
            label:'Home',
            path:'/',
            show:true
        },

        {
            label:'Login',
            path:'/sign-in',
            show:!user ? true : false
        },
        {
            label:'Register',
            path:'/sign-up',
            show:!user ? true : false
        },

        {
            label:'Jobs',
            path:'/jobs',
            show:user  ? true : false
        },
        {
            label:'Activity',
            path:'/activity',
            show:user && profileInfo?.data?.accountType==='candidate'?true:false // we also simpley write user
        },
        {
            label: 'Membership',
            path:'/membership',
            show:user ? true:false
        },
        {
            label:'Account',
            path:'/account',
            show: user ? true:false
        }
    ]

    return (
        <div>
            <header className="flex h-16 w-11/12 mx-auto shrink-0 items-center">
              {/* This sheet handle mobile version */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className='lg:hidden'>
                            <AlignJustify className="h-6 w-6"/>
                            <span className="sr-only">Toggle Navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                         <SheetTitle></SheetTitle>
                        <Link className="mr-6 hidden lg:flex" href={'#'}>
                         <h3 className="p-6 text-5xl font-bold">JOBSCO</h3>
                        </Link>
                        <div className="grid gap-2 p-6">
                            {
                                menuItems.map((item , i)=>(
                                    item.show ? 
                                    <Link onClick={()=>sessionStorage.removeItem("filterParams")} key={i} href={item.path} className={`flex w-full items-center py-2 text-lg font-semibold transition-all duration-300 rounded-lg p-2 ${pathname===item.path?'bg-gray-200':'bg-white'}`}>
                                      {item.label}
                                    </Link>
                                    :
                                    null
                                ))
                            }
                            <UserButton afterSignOutUrl="/"/>
                        </div>
                    </SheetContent>
                </Sheet>

                {/* Create for desktop verisons*/}
                <Link href={'/'}>
                    <h3 className="p-6 text-5xl font-bold">JOBSCO</h3>
                </Link>
                <nav className="ml-auto hidden lg:flex gap-6">
                    {
                        menuItems.map((item,i)=>(
                            item.show ? 
                            <Link 
                              onClick={()=>sessionStorage.removeItem("filterParams")} 
                              className={`group inline-flex h-9 w-max items-center rounded-md ${pathname===item.path ? 'bg-gray-300':'bg-white'}
                               hover:bg-gray-100  px-4 py-2 text-sm font-md font-semibold transition-all duration-300`} key={i} href={item.path}>
                              {item.label}
                            </Link>
                            :
                            null
                        ))
                    }
                    <UserButton afterSignOutUrl="/"/>
                </nav>



            </header>
        </div>
    )
}