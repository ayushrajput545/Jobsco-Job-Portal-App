import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await currentUser() // user is authenticated

  const profileInfo = null // means user is canditate or recuirter

  if(user && !profileInfo?._id) redirect('/on-board')

  return (
    <div className="text-red-500 w-11/12 mx-auto">
      Hello Ji
    </div>
  );
}
