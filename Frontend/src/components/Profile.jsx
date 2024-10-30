import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from './ui/button'
import { Mail, Pen, Phone } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'

const isResume = true
const Profile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    return (
        <div>
            <Navbar />
            <div className='h-[90vh]'>
                <div className="max-w-6xl h-[80vh] mx-auto bg-white border border-gray-300 rounded-2xl my-5 p-8">
                    <div className="flex justify-between">
                        <div className="flex items-center my-5 gap-10">
                            <Avatar>
                                <AvatarImage src={user?.profile?.profilePhoto} className='w-[60px] rounded-full' alt="Profile" />
                            </Avatar>
                            <div>
                                <h1 className='font-bold text-lg'>{user?.fullname}</h1>
                                <p >{user?.profile.bio}</p>
                            </div>

                        </div>
                        <Button onClick={() => setOpen(true)} className='text-right border border-gray-200' variant='outline'><Pen /></Button>
                    </div>
                    <div>
                        <div className="flex items-center gap-5 my-2">
                            <Mail />
                            <span>{user?.email}</span>
                        </div>
                        <div className="flex items-center gap-5 my-2">
                            <Phone />
                            <span>{user?.phone}</span>
                        </div>
                    </div>
                    <div className='my-5'>
                        <h1 className='font-bold text-2xl'>Skills</h1>
                        <div className="flex items-center gap-1 my-2">
                            {
                                user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => <Badge className='bg-black text-white gap-5 hover:bg-black' key={index}>{item}</Badge>) : <span>Na</span>
                            }
                        </div>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1 5">
                        <Label className='text-md font-bold '>Resume</Label>
                        {

                            isResume ? <a href={user?.profile?.resume} target='blank' className='text-blue-700 w-full cursor-pointer hover:underline'>{user?.profile?.resumeOriginalName}</a> : <span>Na</span>
                        }
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto bg-white rounded-2xl my-5 p-8">
                <h1 className='font-bold text-2xl'>Applied Jobs</h1>
                <AppliedJobTable />

            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
