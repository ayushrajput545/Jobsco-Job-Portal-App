'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Bug } from 'lucide-react'
 

const ReportBug = () => {

    const[showReportDialog , setShowReportDialog] = useState(false)
    const [bugMessage, setBugMessage] = useState('')
    const {user} = useUser();
    const router = useRouter()
 
  async function handleSendEmail() {
    if(!user){
        toast.error("Login required!")
        setShowReportDialog(false)
        setBugMessage('')
        router.push('/sign-in')
        return
    }
    const toastid = toast.loading("Loading...")
    try {
      const res = await fetch('/api/report-bug', {
        method: 'POST',
        body: JSON.stringify({
          email: user?.emailAddresses[0]?.emailAddress,
          message: bugMessage,
        }),
      })

      const data = await res.json()
      if (data.success) {
        toast.success("Bug Reported Sucessfully",{
            id:toastid
        })
        setShowReportDialog(false)
        setBugMessage('')
      } else {
        toast.error("Failed to report Bug",{
            id:toastid
        })
      }
    } catch (error) {
      console.error('Error:', error)
        toast.error("Failed to report Bug",{
        id:toastid
      })
    }
  }

  return (
    <div>
        <Button className="fixed left-5 bottom-7 mt-6 flex justify-center" onClick={()=>setShowReportDialog(true)}>
             <div className='flex items-center gap-1'>
                <Bug />
                <p>Report Bug</p>
             </div>
        </Button>
        <Dialog open={showReportDialog} onOpenChange={()=>{
            setShowReportDialog(false)
            setBugMessage('')
        }
        }>
            <DialogContent>
                <DialogHeader className="space-y-3">
                    <DialogTitle>
                        <div className='flex flex-col gap-2'>
                            <h1>Report a Bug</h1>
                            <span className='text-xs italic'><sup className='text-pink-500'>*</sup>Write minimum 10 words</span>
                        </div>
                    </DialogTitle>
                    <textarea value={bugMessage} onChange={(e) => setBugMessage(e.target.value)} name="" id="" rows={6} placeholder='Describe your bug here...' className='border p-3 rounded-lg'/>
                    <Button disabled={bugMessage.trim().split(/\s+/).length < 10} onClick={handleSendEmail} className="w-fit">Submit</Button>
                </DialogHeader>
            </DialogContent>

        </Dialog>
    </div>
  )
}

export default ReportBug