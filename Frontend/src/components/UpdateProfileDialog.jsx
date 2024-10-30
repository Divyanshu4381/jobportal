import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from './utils/constant'
import { setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phone: user?.phone,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map(skill => skill),
    file: user?.profile?.resume
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phone", input.phone);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true)
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/profile")
        toast.success(res.data.message)

      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)

    }
    setOpen(false);

  }
  return (
    <div>
      <Dialog open={open} >
        <DialogContent className='bg-white sm:max-w-[425px]' onInteractOutside={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-2">

                <Label htmlfor="name" >Name</Label>
                <Input id="name" type='text' onChange={changeEventHandler} className='col-span-3 rounded-xl' value={input.fullname} name='name' />
              </div>
              <div className="grid grid-cols-4 items-center gap-2">

                <Label htmlfor="email" >Email</Label>
                <Input id="email" type="email" onChange={changeEventHandler} className='col-span-3 rounded-xl' value={input.email} name='email' />
              </div>
              <div className="grid grid-cols-4 items-center gap-2">

                <Label htmlfor="phone" >Phone</Label>
                <Input id="phone" onChange={changeEventHandler} className='col-span-3 rounded-xl' value={input.phone} name='phone' />
              </div>
              <div className="grid grid-cols-4 items-center gap-2">

                <Label htmlfor="bio" >Bio</Label>
                <Input id="bio" onChange={changeEventHandler} className='col-span-3 rounded-xl' value={input.bio} name='bio' />
              </div>
              <div className="grid grid-cols-4 items-center gap-2">

                <Label htmlfor="skills" >Skills</Label>
                <Input id="skills" onChange={changeEventHandler} className='col-span-3 rounded-xl' value={input.skills} name='skills' />
              </div>
              <div className="grid grid-cols-4 items-center gap-2">

                <Label htmlfor="file" >Resume</Label>
                <Input id="file" onChange={fileChangeHandler} className='col-span-3 rounded-xl' type='file' accept="application/pdf" name='file' />
              </div>
            </div>
            <DialogFooter>
              {
                loading ? <Button className="w-full my-2 bg-[#6A38C2] hover:bg-[#4101af] rounded-xl text-white font-bold"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait...</Button> : <Button type='submit' className='w-full my-2 bg-[#6A38C2] hover:bg-[#4101af] rounded-xl text-white font-bold'>Update</Button>
              }
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateProfileDialog
