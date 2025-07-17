'use client'
import { usePathname } from "next/navigation";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Tilt from 'react-parallax-tilt'

export function CommonCard({icon,title,description,footerContent}){

    const pathname = usePathname()

    return (
        <Tilt
            tiltMaxAngleX={20} // tilt arround x axis
            tiltMaxAngleY={10}
            perspective={900}  // depth of tilt
            transitionSpeed={1500}
            // scale={1.2}
            tiltEnable={pathname==='/activity' ? false :true} 
            gyroscope={true}// tile also in mobile phones
        >
            <Card className='flex bg-gray-100 flex-col gap-6 p-8 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:shadow-gray-600/10 cursor-pointer'>
                <CardHeader className='p-0'>
                    {icon && icon}
                    {title && <CardTitle className='text-xl max-w-[250px] text-ellipsis overflow-hidden whitespace-nowrap font-semibold text-gray-950'>{title}</CardTitle>}
                    {description && <CardDescription className='mt-3 text-gray-600'>{description}</CardDescription>}
                </CardHeader>
                <CardFooter className='p-0'>
                    {footerContent}
                </CardFooter>
            </Card>
        </Tilt>
    )
}