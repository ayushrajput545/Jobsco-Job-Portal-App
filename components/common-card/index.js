import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export function CommonCard({icon,title,description,footerContent}){

    return (
        <Card className='flex bg-gray-100 flex-col gap-6 p-8 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:shadow-gray-600/10 cursor-pointer'>
            <CardHeader className='p-0'>
                {icon && <p>{icon}</p>}
                {title && <CardTitle className='text-xl max-w-[250px] text-ellipsis overflow-hidden whitespace-nowrap font-semibold text-gray-950'>{title}</CardTitle>}
                {description && <CardDescription className='mt-3 text-gray-600'>{description}</CardDescription>}
            </CardHeader>
            <CardFooter className='p-0'>
                {footerContent}
            </CardFooter>
        </Card>
    )
}