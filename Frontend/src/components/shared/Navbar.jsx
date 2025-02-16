import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from '../ui/avatar'
import { User2, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { setUser } from '@/redux/authSlice'
const Navbar = () => {
  const {user} =useSelector(store=>store.auth)
  const dispatch= useDispatch();
  const navigate=useNavigate()
  const logoutHandler=async()=>{
    try {
      const res=await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
      if(res.data.success){
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }

  }
  return (

    <div className='bg-white'>
      <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      <div className='flex justify-between items-center mx-auto max-w-5xl h-16'>
        <div>
          <img src="./job_husltle.png" className='w-[150px]' alt="" srcset="" />
        </div>
        <div className='flex items-center gap-12'>
          <ul className='flex font-medium items-center gap-5'>
            {
              user && user.role == 'recruiter' ? (
                <>
                
                  <li><Link to='/admin/companies'>Companies</Link></li>
                  <li><Link to='/admin/jobs'>Job</Link></li>
                </>

              ) : (
                <>
                  <li><Link to='/'>Home</Link></li>
                  <li><Link to='/jobs'>Job</Link></li>
                  <li><Link to='/browse'>Browses</Link></li>
                </>)
            }

          </ul>
          {
            !user ? (
              <div className='flex items-center gap-2 '>
                <Link to='/Login'><Button variant="">Login</Button></Link>
                <Link to='/Signup'><Button className='bg-[#6A38C2] hover:bg-[#4101af] rounded-xl text-white'>Signup</Button></Link>

              </div>
            ) : (<Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                </Avatar></PopoverTrigger>
              <PopoverContent>
                <div className=''>
                  <div className='flex gap-4 space-y-2'>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                    </Avatar>
                    <div>
                      <h1 className='font-medium'>{user?.fullname}</h1>
                      <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                    </div>
                  </div>
                  <div className='flex flex-col my-2  text-gray-600'>
                    {
                      user && user.role == 'student' && (
                      <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <User2 />
                        <Button variant=""><Link to='/profile'>view profile</Link></Button>
                      </div>
                      )
                    }

                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      <LogOut />
                      <Button onClick={logoutHandler} variant="">Logout</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>)


          }

        </div>
      </div>
    </div >
  )
}

export default Navbar
